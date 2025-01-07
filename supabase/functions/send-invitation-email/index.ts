import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InvitationEmailRequest {
  to: string;
  inviterName: string;
  companyName: string;
  role: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, inviterName, companyName, role, message }: InvitationEmailRequest = await req.json();

    // For testing, we'll send all emails to the verified email
    const testEmail = "info@mier.ch";
    console.log(`Original recipient: ${to}, sending to test email: ${testEmail} instead`);

    const emailHtml = `
      <h1>You've been invited to join ${companyName}</h1>
      <p>${inviterName} has invited you to join ${companyName} as a ${role}.</p>
      ${message ? `<p>Personal message: "${message}"</p>` : ''}
      <p>Click the link below to accept the invitation:</p>
      <a href="https://cropio.app/accept-invitation" style="display: inline-block; background-color: #008060; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Accept Invitation</a>
      <p>If you didn't expect this invitation, you can safely ignore this email.</p>
      <p><small>Original recipient would have been: ${to}</small></p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Cropio <onboarding@resend.dev>",
        to: testEmail, // Using test email instead of actual recipient
        subject: `Join ${companyName} on Cropio`,
        html: emailHtml,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Email sent successfully:", data);

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      const error = await res.text();
      console.error("Error sending email:", error);
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.error("Error in send-invitation-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);