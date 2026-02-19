import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Allowed origins for CORS - restrict to wedding website domains
const ALLOWED_ORIGIN_PATTERNS: (string | RegExp)[] = [
  "https://falkkiani.se",
  "https://www.falkkiani.se",
  "https://falk-kiani-celebrate.lovable.app",
  /^https:\/\/.*eb0e59a1-4e5c-437b-9aa9-3a6605d24d00\.(lovable\.app|lovableproject\.com)$/,
  "http://localhost:5173",
  "http://localhost:8080",
];

const isOriginAllowed = (origin: string | null): boolean => {
  if (!origin) return false;
  return ALLOWED_ORIGIN_PATTERNS.some(p =>
    typeof p === "string" ? origin === p : p.test(origin)
  );
};

const getCorsHeaders = (req: Request): Record<string, string> => {
  const origin = req.headers.get("origin");
  const allowedOrigin = isOriginAllowed(origin) ? origin! : "https://falkkiani.se";

  // Mirror whatever headers the browser asks for in preflight
  const requestedHeaders = req.headers.get("access-control-request-headers");

  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };

  if (requestedHeaders) {
    headers["Access-Control-Allow-Headers"] = requestedHeaders;
  } else {
    headers["Access-Control-Allow-Headers"] =
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version";
  }

  return headers;
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 5; // Max submissions per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || (now - record.timestamp) > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
};

// HTML escape function to prevent XSS in emails
const escapeHtml = (unsafe: string): string => {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Input validation constants
const MAX_NAME_LENGTH = 100;
const MAX_DIETARY_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_SONG_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;

// Validate and sanitize input
const validateInput = (data: RSVPEmailRequest): { valid: boolean; error?: string } => {
  // Check attending field
  if (!data.attending || !["yes", "no"].includes(data.attending)) {
    return { valid: false, error: "Invalid attendance value" };
  }

  // Validate email if provided
  if (data.email) {
    if (data.email.length > MAX_EMAIL_LENGTH) {
      return { valid: false, error: "Email is too long" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { valid: false, error: "Invalid email format" };
    }
  }

  // Validate guests array
  if (data.attending === "yes") {
    if (!data.guests || !Array.isArray(data.guests) || data.guests.length === 0) {
      return { valid: false, error: "At least one guest is required" };
    }
    
    for (const guest of data.guests) {
      if (!guest.name || typeof guest.name !== "string") {
        return { valid: false, error: "Guest name is required" };
      }
      if (guest.name.length > MAX_NAME_LENGTH) {
        return { valid: false, error: "Guest name is too long" };
      }
      if (guest.dietary && guest.dietary.length > MAX_DIETARY_LENGTH) {
        return { valid: false, error: "Dietary information is too long" };
      }
    }
  }

  // Validate optional fields
  if (data.songRequest && data.songRequest.length > MAX_SONG_LENGTH) {
    return { valid: false, error: "Song request is too long" };
  }
  if (data.message && data.message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: "Message is too long" };
  }

  return { valid: true };
};

interface Guest {
  name: string;
  dietary: string;
  attendanceDays: string;
  mealChoice: string;
  shuttle: string;
  isMainGuest: boolean;
}

interface RSVPEmailRequest {
  attending: string;
  email: string;
  guests: Guest[];
  songRequest: string;
  message: string;
}

const getAttendanceDaysText = (days: string): string => {
  const texts: Record<string, string> = {
    both: "Fredag & Lördag",
    saturday: "Endast lördag",
  };
  return texts[days] || escapeHtml(days) || "Ej valt";
};

const getConfirmationEmail = (data: RSVPEmailRequest): string => {
  const mainGuest = data.guests.find(g => g.isMainGuest);
  const partnerGuest = data.guests.find(g => !g.isMainGuest);
  
  const guestCard = (guest: Guest, label: string) => `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 16px 0;">
      <tr>
        <td style="background: #fff9f1; border: 1px solid #4a5c3d30; border-radius: 12px; padding: 24px;">
          <p style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: #8fa882; font-family: Georgia, serif;">${escapeHtml(label)}</p>
          <p style="margin: 0 0 16px 0; font-size: 20px; color: #1b2e00; font-family: Georgia, serif; font-weight: bold;">${escapeHtml(guest.name)}</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding: 8px 0; border-top: 1px solid #4a5c3d20;">
                <span style="color: #8fa882; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-family: Georgia, serif;">Dagar</span><br/>
                <span style="color: #1b2e00; font-size: 15px; font-family: Georgia, serif;">${getAttendanceDaysText(guest.attendanceDays)}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-top: 1px solid #4a5c3d20;">
                <span style="color: #8fa882; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-family: Georgia, serif;">Allergier / Specialkost</span><br/>
                <span style="color: #1b2e00; font-size: 15px; font-family: Georgia, serif;">${escapeHtml(guest.dietary) || "Inga"}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin: 0; padding: 0; background-color: #fff9f1; font-family: Georgia, 'Times New Roman', serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff9f1;">
        <tr><td align="center" style="padding: 40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px;">
            
            <!-- Header -->
            <tr><td style="text-align: center; padding: 0 0 8px 0;">
              <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 4px; color: #8fa882; font-family: Georgia, serif;">Bröllopet</p>
            </td></tr>
            <tr><td style="text-align: center; padding: 0 0 4px 0;">
              <h1 style="margin: 0; font-size: 36px; color: #ff8a00; font-family: Georgia, cursive; font-weight: normal; font-style: italic;">Falk &amp; Kiani</h1>
            </td></tr>
            <tr><td style="text-align: center; padding: 0 0 32px 0;">
              <p style="margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 3px; color: #4a5c3d; font-family: Georgia, serif;">Juli 2026</p>
            </td></tr>

            <!-- Divider -->
            <tr><td style="padding: 0 60px 32px 60px;">
              <div style="border-top: 1px solid #4a5c3d40; width: 100%;"></div>
            </td></tr>

            <!-- Greeting -->
            <tr><td style="text-align: center; padding: 0 20px 24px 20px;">
              <p style="margin: 0 0 12px 0; font-size: 20px; color: #1b2e00; font-family: Georgia, serif;">Hej ${escapeHtml(mainGuest?.name || "")}!</p>
              <p style="margin: 0; font-size: 15px; color: #4a5c3d; line-height: 1.6; font-family: Georgia, serif;">Tack för din OSA! Vi är så glada att du kommer och firar med oss. Här är en sammanfattning av ditt svar.</p>
            </td></tr>

            <!-- Guest cards -->
            <tr><td style="padding: 0 0 8px 0;">
              ${mainGuest ? guestCard(mainGuest, "Gäst") : ""}
              ${partnerGuest ? guestCard(partnerGuest, "Partner") : ""}
            </td></tr>

            <!-- Song request -->
            ${data.songRequest ? `
            <tr><td style="padding: 8px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="background: #fff9f1; border: 1px solid #4a5c3d30; border-radius: 12px; padding: 20px;">
                  <span style="color: #8fa882; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-family: Georgia, serif;">🎵 Låtönskemål</span><br/>
                  <span style="color: #1b2e00; font-size: 15px; font-family: Georgia, serif;">${escapeHtml(data.songRequest)}</span>
                </td></tr>
              </table>
            </td></tr>
            ` : ""}

            <!-- Message -->
            ${data.message ? `
            <tr><td style="padding: 8px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="background: #fff9f1; border: 1px solid #4a5c3d30; border-radius: 12px; padding: 20px;">
                  <span style="color: #8fa882; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-family: Georgia, serif;">💬 Meddelande</span><br/>
                  <span style="color: #1b2e00; font-size: 15px; font-family: Georgia, serif;">${escapeHtml(data.message)}</span>
                </td></tr>
              </table>
            </td></tr>
            ` : ""}

            <!-- Divider -->
            <tr><td style="padding: 24px 60px;">
              <div style="border-top: 1px solid #4a5c3d40; width: 100%;"></div>
            </td></tr>

            <!-- Closing -->
            <tr><td style="text-align: center; padding: 0 20px 40px 20px;">
              <p style="margin: 0 0 8px 0; font-size: 15px; color: #4a5c3d; font-style: italic; font-family: Georgia, serif;">Vi ser fram emot att fira med dig!</p>
              <p style="margin: 0; font-size: 14px; color: #8fa882; font-family: Georgia, serif;">Med kärlek,</p>
              <p style="margin: 4px 0 0 0; font-size: 22px; color: #ff8a00; font-family: Georgia, cursive; font-style: italic;">Falk &amp; Kiani</p>
            </td></tr>
            
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
};

const getDeclineConfirmationEmail = (): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin: 0; padding: 0; background-color: #fff9f1; font-family: Georgia, 'Times New Roman', serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff9f1;">
        <tr><td align="center" style="padding: 40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px;">
            <tr><td style="text-align: center; padding: 0 0 8px 0;">
              <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 4px; color: #8fa882; font-family: Georgia, serif;">Bröllopet</p>
            </td></tr>
            <tr><td style="text-align: center; padding: 0 0 4px 0;">
              <h1 style="margin: 0; font-size: 36px; color: #ff8a00; font-family: Georgia, cursive; font-weight: normal; font-style: italic;">Falk &amp; Kiani</h1>
            </td></tr>
            <tr><td style="text-align: center; padding: 0 0 32px 0;">
              <p style="margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 3px; color: #4a5c3d; font-family: Georgia, serif;">Juli 2026</p>
            </td></tr>
            <tr><td style="padding: 0 60px 32px 60px;">
              <div style="border-top: 1px solid #4a5c3d40; width: 100%;"></div>
            </td></tr>
            <tr><td style="text-align: center; padding: 0 20px 24px 20px;">
              <p style="margin: 0 0 16px 0; font-size: 18px; color: #1b2e00; font-family: Georgia, serif;">Tack för ditt svar.</p>
              <p style="margin: 0; font-size: 15px; color: #4a5c3d; line-height: 1.6; font-family: Georgia, serif;">Vi beklagar att du inte kan vara med oss på vår stora dag, men vi förstår att livet inte alltid passar in.</p>
            </td></tr>
            <tr><td style="padding: 0 60px 24px 60px;">
              <div style="border-top: 1px solid #4a5c3d40; width: 100%;"></div>
            </td></tr>
            <tr><td style="text-align: center; padding: 0 20px 40px 20px;">
              <p style="margin: 0; font-size: 14px; color: #8fa882; font-family: Georgia, serif;">Med kärlek,</p>
              <p style="margin: 4px 0 0 0; font-size: 22px; color: #ff8a00; font-family: Georgia, cursive; font-style: italic;">Falk &amp; Kiani</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
};

const getNotificationEmail = (data: RSVPEmailRequest): string => {
  const mainGuest = data.guests?.find(g => g.isMainGuest);
  const partnerGuest = data.guests?.find(g => !g.isMainGuest);

  if (data.attending === "no") {
    return `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin: 0; padding: 0; background-color: #fff9f1; font-family: Georgia, 'Times New Roman', serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff9f1;">
          <tr><td align="center" style="padding: 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px;">
              <tr><td style="text-align: center; padding: 0 0 8px 0;">
                <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 4px; color: #8fa882;">OSA Notifikation</p>
              </td></tr>
              <tr><td style="text-align: center; padding: 0 0 24px 0;">
                <h1 style="margin: 0; font-size: 28px; color: #b91c1c; font-family: Georgia, serif;">❌ Kan inte komma</h1>
              </td></tr>
              <tr><td style="padding: 0 60px 24px 60px;">
                <div style="border-top: 1px solid #4a5c3d40; width: 100%;"></div>
              </td></tr>
              <tr><td style="text-align: center; padding: 0 20px 40px 20px;">
                <p style="margin: 0; font-size: 15px; color: #4a5c3d; font-family: Georgia, serif;">En gäst har svarat att de tyvärr inte kan komma.</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;
  }

  const guestRow = (guest: Guest, label: string) => `
    <tr>
      <td colspan="2" style="padding: 16px 20px 8px 20px; background: #fff9f1;">
        <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #8fa882; font-family: Georgia, serif;">${escapeHtml(label)}</p>
        <p style="margin: 4px 0 0 0; font-size: 18px; color: #1b2e00; font-weight: bold; font-family: Georgia, serif;">${escapeHtml(guest.name)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 20px; color: #8fa882; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-family: Georgia, serif; border-top: 1px solid #4a5c3d15;">Dagar</td>
      <td style="padding: 8px 20px; color: #1b2e00; font-size: 14px; font-family: Georgia, serif; border-top: 1px solid #4a5c3d15;">${getAttendanceDaysText(guest.attendanceDays)}</td>
    </tr>
    <tr>
      <td style="padding: 8px 20px 16px 20px; color: #8fa882; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-family: Georgia, serif;">Kost</td>
      <td style="padding: 8px 20px 16px 20px; color: #1b2e00; font-size: 14px; font-family: Georgia, serif;">${escapeHtml(guest.dietary) || "Inga"}</td>
    </tr>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin: 0; padding: 0; background-color: #fff9f1; font-family: Georgia, 'Times New Roman', serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff9f1;">
        <tr><td align="center" style="padding: 40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px;">
            
            <!-- Header -->
            <tr><td style="text-align: center; padding: 0 0 8px 0;">
              <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 4px; color: #8fa882;">OSA Notifikation</p>
            </td></tr>
            <tr><td style="text-align: center; padding: 0 0 24px 0;">
              <h1 style="margin: 0; font-size: 28px; color: #4a5c3d; font-family: Georgia, serif;">✅ Ny OSA — Kommer!</h1>
            </td></tr>
            <tr><td style="padding: 0 60px 24px 60px;">
              <div style="border-top: 1px solid #4a5c3d40; width: 100%;"></div>
            </td></tr>

            <!-- Summary -->
            <tr><td style="padding: 0 0 16px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #fff9f1; border: 1px solid #4a5c3d30; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px 20px; color: #8fa882; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-family: Georgia, serif;">E-post</td>
                  <td style="padding: 16px 20px; font-family: Georgia, serif;"><a href="mailto:${escapeHtml(data.email)}" style="color: #4a5c3d; text-decoration: none;">${escapeHtml(data.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 20px 16px 20px; color: #8fa882; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-family: Georgia, serif; border-top: 1px solid #4a5c3d15;">Antal gäster</td>
                  <td style="padding: 8px 20px 16px 20px; color: #1b2e00; font-size: 14px; font-family: Georgia, serif; border-top: 1px solid #4a5c3d15;">${data.guests?.length || 1}</td>
                </tr>
              </table>
            </td></tr>

            <!-- Guest details -->
            <tr><td style="padding: 0 0 16px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: white; border: 1px solid #4a5c3d30; border-radius: 12px; overflow: hidden;">
                ${mainGuest ? guestRow(mainGuest, "Huvudgäst") : ""}
                ${partnerGuest ? `<tr><td colspan="2" style="padding: 0 20px;"><div style="border-top: 2px solid #4a5c3d20;"></div></td></tr>${guestRow(partnerGuest, "Partner")}` : ""}
              </table>
            </td></tr>

            ${data.songRequest ? `
            <tr><td style="padding: 0 0 12px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="background: #fff9f1; border: 1px solid #4a5c3d30; border-radius: 12px; padding: 16px 20px;">
                  <span style="color: #8fa882; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-family: Georgia, serif;">🎵 Låtönskemål</span><br/>
                  <span style="color: #1b2e00; font-size: 14px; font-family: Georgia, serif;">${escapeHtml(data.songRequest)}</span>
                </td></tr>
              </table>
            </td></tr>
            ` : ""}

            ${data.message ? `
            <tr><td style="padding: 0 0 12px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="background: #fff9f1; border: 1px solid #4a5c3d30; border-radius: 12px; padding: 16px 20px;">
                  <span style="color: #8fa882; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-family: Georgia, serif;">💬 Meddelande</span><br/>
                  <span style="color: #1b2e00; font-size: 14px; font-family: Georgia, serif;">${escapeHtml(data.message)}</span>
                </td></tr>
              </table>
            </td></tr>
            ` : ""}

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  // Rate limiting based on IP
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
    || req.headers.get("cf-connecting-ip") 
    || req.headers.get("x-real-ip") 
    || "unknown";
  
  if (!checkRateLimit(clientIP)) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const data: RSVPEmailRequest = await req.json();
    console.log("Received RSVP submission from IP:", clientIP);

    // Validate input
    const validation = validateInput(data);
    if (!validation.valid) {
      console.warn("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send notification email to couple
    const notificationEmail = await resend.emails.send({
      from: "Wedding OSA <hello@falkkiani.se>",
      replyTo: data.email || "falkkiani2026@gmail.com",
      to: ["falkkiani2026@gmail.com"],
      subject: data.attending === "yes" 
        ? `✅ Ny OSA: ${escapeHtml(data.guests?.[0]?.name || "Gäst")} kommer!${data.guests?.length > 1 ? ` (+1)` : ""}`
        : `❌ OSA: Kan inte komma`,
      html: getNotificationEmail(data),
    });

    console.log("Notification email sent successfully");

    // Send confirmation email to guest (only if attending and has email)
    if (data.attending === "yes" && data.email) {
      const confirmationEmail = await resend.emails.send({
        from: "Falk & Kiani <hello@falkkiani.se>",
        replyTo: "falkkiani2026@gmail.com",
        to: [data.email],
        subject: "Tack för din OSA - Falk & Kiani 2026",
        html: getConfirmationEmail(data),
      });
      console.log("Confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    // Log detailed error server-side only
    console.error("Error in send-rsvp-emails function:", error);
    
    // Return generic error message to client
    return new Response(
      JSON.stringify({ error: "Unable to process your RSVP. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
