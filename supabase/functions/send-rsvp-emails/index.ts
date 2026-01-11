import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RSVPEmailRequest {
  names: string;
  email: string;
  attending: string;
  plusOne: boolean;
  dietary: string;
  mealChoice: string;
  shuttle: string;
  songRequest: string;
  message: string;
  language: string;
}

const getAttendingText = (attending: string, language: string) => {
  const texts: Record<string, Record<string, string>> = {
    yes: { sv: "Ja, jag kommer!", en: "Yes, I'll be there!", de: "Ja, ich komme!" },
    no: { sv: "Nej, tyvärr kan jag inte", en: "No, unfortunately I can't", de: "Nein, leider kann ich nicht" },
  };
  return texts[attending]?.[language] || texts[attending]?.en || attending;
};

const getMealText = (meal: string, language: string) => {
  const texts: Record<string, Record<string, string>> = {
    meat: { sv: "Kött", en: "Meat", de: "Fleisch" },
    fish: { sv: "Fisk", en: "Fish", de: "Fisch" },
    vegetarian: { sv: "Vegetariskt", en: "Vegetarian", de: "Vegetarisch" },
    vegan: { sv: "Veganskt", en: "Vegan", de: "Vegan" },
  };
  return texts[meal]?.[language] || texts[meal]?.en || meal;
};

const getShuttleText = (shuttle: string, language: string) => {
  const texts: Record<string, Record<string, string>> = {
    both: { sv: "Ja, till och från", en: "Yes, both ways", de: "Ja, hin und zurück" },
    to: { sv: "Endast till", en: "Only to the venue", de: "Nur zur Location" },
    from: { sv: "Endast från", en: "Only from the venue", de: "Nur von der Location" },
    no: { sv: "Nej tack", en: "No thanks", de: "Nein danke" },
  };
  return texts[shuttle]?.[language] || texts[shuttle]?.en || shuttle;
};

const getConfirmationSubject = (language: string) => {
  const subjects: Record<string, string> = {
    sv: "Tack för din OSA - Falk & Kiani 2026",
    en: "Thank you for your RSVP - Falk & Kiani 2026",
    de: "Vielen Dank für Ihre Antwort - Falk & Kiani 2026",
  };
  return subjects[language] || subjects.en;
};

const getConfirmationEmail = (data: RSVPEmailRequest) => {
  const { names, attending, plusOne, dietary, mealChoice, shuttle, songRequest, message, language } = data;
  
  const greetings: Record<string, string> = {
    sv: `Hej ${names}!`,
    en: `Hello ${names}!`,
    de: `Hallo ${names}!`,
  };

  const thankYouMessages: Record<string, string> = {
    sv: "Tack för att du svarade på vår bröllopsinbjudan!",
    en: "Thank you for responding to our wedding invitation!",
    de: "Vielen Dank für Ihre Antwort auf unsere Hochzeitseinladung!",
  };

  const summaryHeaders: Record<string, string> = {
    sv: "Här är en sammanfattning av ditt svar:",
    en: "Here is a summary of your response:",
    de: "Hier ist eine Zusammenfassung Ihrer Antwort:",
  };

  const labels: Record<string, Record<string, string>> = {
    attending: { sv: "Närvaro", en: "Attendance", de: "Anwesenheit" },
    plusOne: { sv: "Plus en", en: "Plus one", de: "Begleitung" },
    dietary: { sv: "Kostpreferenser", en: "Dietary requirements", de: "Ernährungsbedürfnisse" },
    meal: { sv: "Måltidsval", en: "Meal choice", de: "Mahlzeitwahl" },
    shuttle: { sv: "Shuttlebuss", en: "Shuttle", de: "Shuttle" },
    song: { sv: "Låtönskemål", en: "Song request", de: "Musikwunsch" },
    message: { sv: "Meddelande", en: "Message", de: "Nachricht" },
  };

  const yesNo: Record<string, Record<boolean, string>> = {
    sv: { true: "Ja", false: "Nej" },
    en: { true: "Yes", false: "No" },
    de: { true: "Ja", false: "Nein" },
  };

  const closings: Record<string, string> = {
    sv: "Vi ser fram emot att fira med dig!<br><br>Med kärlek,<br>Falk & Kiani",
    en: "We look forward to celebrating with you!<br><br>With love,<br>Falk & Kiani",
    de: "Wir freuen uns darauf, mit Ihnen zu feiern!<br><br>Mit Liebe,<br>Falk & Kiani",
  };

  const lang = language || 'en';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Georgia, serif; color: #1a1a1a; background-color: #f8f6f3; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #2d4a3e; font-size: 28px; margin: 0; }
        .content { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .greeting { font-size: 18px; margin-bottom: 20px; }
        .summary { margin: 20px 0; }
        .summary-item { padding: 12px 0; border-bottom: 1px solid #e8e4df; }
        .summary-item:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #2d4a3e; }
        .value { color: #4a4a4a; }
        .closing { margin-top: 30px; font-style: italic; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💍 Falk & Kiani 2026 💍</h1>
        </div>
        <div class="content">
          <p class="greeting">${greetings[lang] || greetings.en}</p>
          <p>${thankYouMessages[lang] || thankYouMessages.en}</p>
          <p><strong>${summaryHeaders[lang] || summaryHeaders.en}</strong></p>
          <div class="summary">
            <div class="summary-item">
              <span class="label">${labels.attending[lang]}:</span>
              <span class="value">${getAttendingText(attending, lang)}</span>
            </div>
            <div class="summary-item">
              <span class="label">${labels.plusOne[lang]}:</span>
              <span class="value">${yesNo[lang]?.[plusOne] || (plusOne ? 'Yes' : 'No')}</span>
            </div>
            ${dietary ? `
            <div class="summary-item">
              <span class="label">${labels.dietary[lang]}:</span>
              <span class="value">${dietary}</span>
            </div>
            ` : ''}
            ${mealChoice ? `
            <div class="summary-item">
              <span class="label">${labels.meal[lang]}:</span>
              <span class="value">${getMealText(mealChoice, lang)}</span>
            </div>
            ` : ''}
            ${shuttle ? `
            <div class="summary-item">
              <span class="label">${labels.shuttle[lang]}:</span>
              <span class="value">${getShuttleText(shuttle, lang)}</span>
            </div>
            ` : ''}
            ${songRequest ? `
            <div class="summary-item">
              <span class="label">${labels.song[lang]}:</span>
              <span class="value">${songRequest}</span>
            </div>
            ` : ''}
            ${message ? `
            <div class="summary-item">
              <span class="label">${labels.message[lang]}:</span>
              <span class="value">${message}</span>
            </div>
            ` : ''}
          </div>
          <p class="closing">${closings[lang] || closings.en}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getNotificationEmail = (data: RSVPEmailRequest) => {
  const { names, email, attending, plusOne, dietary, mealChoice, shuttle, songRequest, message } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #1a1a1a; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2d4a3e; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f8f6f3; }
        .field { padding: 10px 0; border-bottom: 1px solid #ddd; }
        .label { font-weight: bold; color: #2d4a3e; }
        .value { margin-top: 5px; }
        .attending-yes { color: #22c55e; font-weight: bold; }
        .attending-no { color: #ef4444; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 New RSVP Submission!</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Guest Name(s):</div>
            <div class="value">${names}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>
          <div class="field">
            <div class="label">Attending:</div>
            <div class="value ${attending === 'yes' ? 'attending-yes' : 'attending-no'}">
              ${attending === 'yes' ? '✅ YES' : '❌ NO'}
            </div>
          </div>
          <div class="field">
            <div class="label">Plus One:</div>
            <div class="value">${plusOne ? '✅ Yes' : '❌ No'}</div>
          </div>
          <div class="field">
            <div class="label">Dietary Requirements:</div>
            <div class="value">${dietary || 'None specified'}</div>
          </div>
          <div class="field">
            <div class="label">Meal Choice:</div>
            <div class="value">${mealChoice || 'Not selected'}</div>
          </div>
          <div class="field">
            <div class="label">Shuttle:</div>
            <div class="value">${shuttle || 'Not selected'}</div>
          </div>
          <div class="field">
            <div class="label">Song Request:</div>
            <div class="value">${songRequest || 'None'}</div>
          </div>
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${message || 'No message'}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: RSVPEmailRequest = await req.json();
    console.log("Received RSVP submission:", data);

    // Validate required fields
    if (!data.names || !data.email || !data.attending) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send confirmation email to guest (no-reply)
    const confirmationEmail = await resend.emails.send({
      from: "Falk & Kiani <hello@falkkiani.se>",
      replyTo: "noreply@falkkiani.se",
      to: [data.email],
      subject: getConfirmationSubject(data.language),
      html: getConfirmationEmail(data),
    });

    console.log("Confirmation email sent:", confirmationEmail);

    // Send notification email to couple
    const notificationEmail = await resend.emails.send({
      from: "Wedding RSVP <hello@falkkiani.se>",
      replyTo: data.email,
      to: ["falkkiani2026@gmail.com"],
      subject: `New RSVP: ${data.names} - ${data.attending === 'yes' ? '✅ Attending' : '❌ Not Attending'}`,
      html: getNotificationEmail(data),
    });

    console.log("Notification email sent:", notificationEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        confirmationId: confirmationEmail.data?.id,
        notificationId: notificationEmail.data?.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-rsvp-emails function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
