import { Resend } from "resend";

const CONTACT_RECIPIENT = "ermalkomonidev@gmail.com";
const FROM_ADDRESS = "Portfolio Contact <onboarding@resend.dev>";

interface ContactBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const json = (statusCode: number, body: object) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const handler = async (event: {
  httpMethod: string;
  body: string | null;
}) => {
  if (event.httpMethod !== "POST") {
    return json(405, { success: false, message: "Method not allowed" });
  }

  let parsed: ContactBody = {};
  try {
    parsed = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { success: false, message: "Invalid request body" });
  }

  const { name, email, subject, message } = parsed;

  if (!name || !email || !subject || !message) {
    return json(400, { success: false, message: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json(400, {
      success: false,
      message: "Please provide a valid email address",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return json(500, {
      success: false,
      message:
        "Email service is not configured. Please contact me directly at ermalkomonidev@gmail.com",
    });
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 8px; font-size: 14px; color: #64748b;">
            <p><strong>Sent from:</strong> Portfolio Contact Form</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nSent from Portfolio Contact Form\nTimestamp: ${new Date().toLocaleString()}`,
    });

    if (error) {
      console.error("Resend API error:", error);
      return json(500, {
        success: false,
        message:
          "Sorry, your message could not be sent right now. Please email me directly at ermalkomonidev@gmail.com",
      });
    }

    return json(200, {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (err) {
    console.error("Contact function error:", err);
    return json(500, {
      success: false,
      message:
        "Sorry, there was an error processing your message. Please try again later.",
    });
  }
};
