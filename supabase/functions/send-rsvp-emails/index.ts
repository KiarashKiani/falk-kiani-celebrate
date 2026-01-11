import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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
  return texts[meal] || meal || "Ej valt";
};

const getShuttleText = (shuttle: string): string => {
  const texts: Record<string, string> = {
    both: "Ja, tur och retur",
    to: "Bara dit",
    from: "Bara hem",
    no: "Nej tack",
  };
  return texts[shuttle] || shuttle || "Ej valt";
};

const getConfirmationEmail = (data: RSVPEmailRequest): string => {
  const mainGuest = data.guests.find(g => g.isMainGuest);
  const partnerGuest = data.guests.find(g => !g.isMainGuest);
  
  const guestSummary = (guest: Guest, label: string) => `
    <div style="background: #f8f6f3; padding: 20px; border-radius: 8px; margin: 15px 0;">
      <h3 style="color: #2d4a3e; margin: 0 0 15px 0; font-size: 18px; border-bottom: 1px solid #e8e4df; padding-bottom: 10px;">${label}: ${guest.name}</h3>
      <div style="margin: 10px 0;">
        <strong style="color: #2d4a3e;">Allergier/Specialkost:</strong>
        <span style="color: #4a4a4a;"> ${guest.dietary || "Inga"}</span>
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
          <p style="font-size: 18px;">Hej ${mainGuest?.name || ""}!</p>
          <p>Tack för din OSA! Vi är så glada att du kommer och firar med oss.</p>
          
          <p><strong>Här är en sammanfattning av ditt svar:</strong></p>
          
          ${mainGuest ? guestSummary(mainGuest, "Gäst") : ""}
          ${partnerGuest ? guestSummary(partnerGuest, "Partner") : ""}
          
          ${data.songRequest ? `
          <div style="margin: 20px 0;">
            <strong style="color: #2d4a3e;">Låtönskemål:</strong>
            <span style="color: #4a4a4a;"> ${data.songRequest}</span>
          </div>
          ` : ""}
          
          ${data.message ? `
          <div style="margin: 20px 0;">
            <strong style="color: #2d4a3e;">Meddelande:</strong>
            <span style="color: #4a4a4a;"> ${data.message}</span>
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
        ${label}: ${guest.name}
      </td>
    </tr>
    <tr>
      <td style="padding: 10px 15px; font-weight: bold; border-bottom: 1px solid #ddd;">Allergier/Specialkost</td>
      <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${guest.dietary || "Inga"}</td>
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
            <strong>E-post:</strong> <a href="mailto:${data.email}">${data.email}</a>
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
            <p style="margin: 5px 0 0 0;">${data.songRequest}</p>
          </div>
          ` : ""}
          
          ${data.message ? `
          <div style="margin-top: 15px; padding: 15px; background: white; border-radius: 8px;">
            <strong style="color: #2d4a3e;">💬 Meddelande:</strong>
            <p style="margin: 5px 0 0 0;">${data.message}</p>
          </div>
          ` : ""}
        </div>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: RSVPEmailRequest = await req.json();
    console.log("Received RSVP submission:", JSON.stringify(data, null, 2));

    if (!data.attending) {
      return new Response(
        JSON.stringify({ error: "Missing attending field" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send notification email to couple
    const notificationEmail = await resend.emails.send({
      from: "Wedding OSA <hello@falkkiani.se>",
      replyTo: data.email || "falkkiani2026@gmail.com",
      to: ["falkkiani2026@gmail.com"],
      subject: data.attending === "yes" 
        ? `✅ Ny OSA: ${data.guests?.[0]?.name || "Gäst"} kommer!${data.guests?.length > 1 ? ` (+1)` : ""}`
        : `❌ OSA: Kan inte komma`,
      html: getNotificationEmail(data),
    });

    console.log("Notification email sent:", notificationEmail);

    // Send confirmation email to guest (only if attending and has email)
    if (data.attending === "yes" && data.email) {
      const confirmationEmail = await resend.emails.send({
        from: "Falk & Kiani <hello@falkkiani.se>",
        replyTo: "falkkiani2026@gmail.com",
        to: [data.email],
        subject: "Tack för din OSA - Falk & Kiani 2026",
        html: getConfirmationEmail(data),
      });
      console.log("Confirmation email sent:", confirmationEmail);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-rsvp-emails function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);