import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  to: string;
  firstName: string;
  companyName: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received welcome email request");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("Email service configuration is missing");
    }

    const { to, firstName, companyName }: WelcomeEmailRequest = await req.json();

    if (!to || !firstName || !companyName) {
      console.error("Missing required fields:", { to, firstName, companyName });
      throw new Error("Missing required fields for sending welcome email");
    }

    // For testing, we'll send all emails to the verified email
    const testEmail = "info@mier.ch";
    console.log(`Original recipient: ${to}, sending to test email: ${testEmail}`);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Cropio</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
            <h1 style="color: #111827; margin-bottom: 16px;">Welcome to Cropio, ${firstName}!</h1>
            <p style="margin-bottom: 16px;">We're excited to have you and ${companyName} join our platform.</p>
            <p style="margin-bottom: 16px;">Here's what you can do next:</p>
            <ul style="margin-bottom: 24px; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Complete your company profile</li>
              <li style="margin-bottom: 8px;">Invite team members</li>
              <li style="margin-bottom: 8px;">Explore our features</li>
            </ul>
            <div style="margin: 32px 0;">
              <a href="https://cropio.app/dashboard" 
                 style="display: inline-block; background-color: #008060; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">
                Go to Dashboard
              </a>
            </div>
            <p style="color: #6b7280; font-size: 14px;">If you need any help getting started, don't hesitate to contact our support team.</p>
          </div>
        </body>
      </html>
    `;

    console.log("Sending welcome email via Resend API");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Cropio <onboarding@resend.dev>",
        to: testEmail,
        subject: `Welcome to Cropio, ${firstName}!`,
        html: emailHtml,
      }),
    });

    const resData = await res.json();

    if (res.ok) {
      console.log("Welcome email sent successfully:", resData);
      return new Response(JSON.stringify(resData), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      console.error("Resend API error:", resData);
      return new Response(JSON.stringify({ error: "Failed to send email", details: resData }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(JSON.stringify({ 
      error: "Internal server error", 
      message: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);