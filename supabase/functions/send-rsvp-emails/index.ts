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

const getMealText = (meal: string): string => {
  const texts: Record<string, string> = {
    meat: "Kött",
    fish: "Fisk",
    vegetarian: "Vegetarisk",
    vegan: "Vegansk",
  };
  return texts[meal] || escapeHtml(meal) || "Ej valt";
};

const getShuttleText = (shuttle: string): string => {
  const texts: Record<string, string> = {
    both: "Ja, tur och retur",
    to: "Bara dit",
    from: "Bara hem",
    no: "Nej tack",
  };
  return texts[shuttle] || escapeHtml(shuttle) || "Ej valt";
};

const getConfirmationEmail = (data: RSVPEmailRequest): string => {
  const mainGuest = data.guests.find(g => g.isMainGuest);
  const partnerGuest = data.guests.find(g => !g.isMainGuest);
  
  const guestSummary = (guest: Guest, label: string) => `
    <div style="background: #f8f6f3; padding: 20px; border-radius: 8px; margin: 15px 0;">
      <h3 style="color: #2d4a3e; margin: 0 0 15px 0; font-size: 18px; border-bottom: 1px solid #e8e4df; padding-bottom: 10px;">${escapeHtml(label)}: ${escapeHtml(guest.name)}</h3>
      <div style="margin: 10px 0;">
        <strong style="color: #2d4a3e;">Allergier/Specialkost:</strong>
        <span style="color: #4a4a4a;"> ${escapeHtml(guest.dietary) || "Inga"}</span>
      </div>
      <div style="margin: 10px 0;">
        <strong style="color: #2d4a3e;">Måltidsval:</strong>
        <span style="color: #4a4a4a;"> ${getMealText(guest.mealChoice)}</span>
      </div>
      <div style="margin: 10px 0;">
        <strong style="color: #2d4a3e;">Pendlingsbuss:</strong>
        <span style="color: #4a4a4a;"> ${getShuttleText(guest.shuttle)}</span>
      </div>
    </div>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Georgia, serif; color: #1a1a1a; background-color: #f8f6f3; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #2d4a3e; font-size: 28px; margin: 0; }
        .content { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .closing { margin-top: 30px; font-style: italic; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💍 Falk & Kiani 2026 💍</h1>
        </div>
        <div class="content">
          <p style="font-size: 18px;">Hej ${escapeHtml(mainGuest?.name || "")}!</p>
          <p>Tack för din OSA! Vi är så glada att du kommer och firar med oss.</p>
          
          <p><strong>Här är en sammanfattning av ditt svar:</strong></p>
          
          ${mainGuest ? guestSummary(mainGuest, "Gäst") : ""}
          ${partnerGuest ? guestSummary(partnerGuest, "Partner") : ""}
          
          ${data.songRequest ? `
          <div style="margin: 20px 0;">
            <strong style="color: #2d4a3e;">Låtönskemål:</strong>
            <span style="color: #4a4a4a;"> ${escapeHtml(data.songRequest)}</span>
          </div>
          ` : ""}
          
          ${data.message ? `
          <div style="margin: 20px 0;">
            <strong style="color: #2d4a3e;">Meddelande:</strong>
            <span style="color: #4a4a4a;"> ${escapeHtml(data.message)}</span>
          </div>
          ` : ""}
          
          <p class="closing">Vi ser fram emot att fira med dig!<br><br>Med kärlek,<br>Falk & Kiani</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getDeclineConfirmationEmail = (): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Georgia, serif; color: #1a1a1a; background-color: #f8f6f3; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #2d4a3e; font-size: 28px; margin: 0; }
        .content { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💍 Falk & Kiani 2026 💍</h1>
        </div>
        <div class="content">
          <p>Tack för ditt svar.</p>
          <p>Vi beklagar att du inte kan vara med oss på vår stora dag, men vi förstår att livet inte alltid passar in.</p>
          <p style="font-style: italic; margin-top: 30px;">Med kärlek,<br>Falk & Kiani</p>
        </div>
      </div>
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
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #1a1a1a; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 20px; background: #f8f6f3; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>❌ OSA - Kan inte komma</h1>
          </div>
          <div class="content">
            <p>En gäst har svarat att de tyvärr inte kan komma.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  const guestRow = (guest: Guest, label: string) => `
    <tr style="background: #f0f9f6;">
      <td colspan="2" style="padding: 15px; font-weight: bold; color: #2d4a3e; border-bottom: 2px solid #2d4a3e;">
        ${escapeHtml(label)}: ${escapeHtml(guest.name)}
      </td>
    </tr>
    <tr>
      <td style="padding: 10px 15px; font-weight: bold; border-bottom: 1px solid #ddd;">Allergier/Specialkost</td>
      <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${escapeHtml(guest.dietary) || "Inga"}</td>
    </tr>
    <tr>
      <td style="padding: 10px 15px; font-weight: bold; border-bottom: 1px solid #ddd;">Måltidsval</td>
      <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${getMealText(guest.mealChoice)}</td>
    </tr>
    <tr>
      <td style="padding: 10px 15px; font-weight: bold; border-bottom: 1px solid #ddd;">Pendlingsbuss</td>
      <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${getShuttleText(guest.shuttle)}</td>
    </tr>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #1a1a1a; margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #22c55e; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">✅ Ny OSA - Kommer!</h1>
        </div>
        <div style="padding: 20px; background: #f8f6f3; border-radius: 0 0 8px 8px;">
          <div style="margin-bottom: 15px;">
            <strong>E-post:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>
          </div>
          <div style="margin-bottom: 15px;">
            <strong>Antal gäster:</strong> ${data.guests?.length || 1}
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background: white; border-radius: 8px; overflow: hidden;">
            ${mainGuest ? guestRow(mainGuest, "Huvudgäst") : ""}
            ${partnerGuest ? guestRow(partnerGuest, "Partner") : ""}
          </table>
          
          ${data.songRequest ? `
          <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px;">
            <strong style="color: #2d4a3e;">🎵 Låtönskemål:</strong>
            <p style="margin: 5px 0 0 0;">${escapeHtml(data.songRequest)}</p>
          </div>
          ` : ""}
          
          ${data.message ? `
          <div style="margin-top: 15px; padding: 15px; background: white; border-radius: 8px;">
            <strong style="color: #2d4a3e;">💬 Meddelande:</strong>
            <p style="margin: 5px 0 0 0;">${escapeHtml(data.message)}</p>
          </div>
          ` : ""}
        </div>
      </div>
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
