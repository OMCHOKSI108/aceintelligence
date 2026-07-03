import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const GMAIL_SMTP_FROM = process.env.GMAIL_SMTP_EMAIL || "omchoksi.pro@gmail.com";
const GMAIL_SMTP_PASS = process.env.GMAIL_SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "";

const RECIPIENTS = [
  "omchoksi99@gmail.com",
  "yashco.ltd@gmail.com",
  "401anshgajera@gmail.com",
];

function buildEmailHtml(data: {
  name: string;
  email: string;
  company: string;
  budget: string;
  service: string;
  description: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', -apple-system, sans-serif; background: #f8fafc; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 0 auto; padding: 32px 24px; }
    .header { text-align: center; padding-bottom: 24px; border-bottom: 1px solid #e2e8f0; }
    .header h1 { font-size: 20px; color: #0f172a; margin: 0; font-weight: 600; }
    .header p { font-size: 13px; color: #64748b; margin: 4px 0 0; }
    .fields { padding: 24px 0; }
    .field { margin-bottom: 20px; }
    .field-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #94a3b8; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #0f172a; line-height: 1.5; }
    .divider { height: 1px; background: #e2e8f0; margin: 20px 0; }
    .footer { text-align: center; padding-top: 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Project Inquiry</h1>
      <p>Ace Intelligence Systems &mdash; Contact Form</p>
    </div>
    <div class="fields">
      <div class="field">
        <div class="field-label">Name</div>
        <div class="field-value">${data.name}</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value">${data.email}</div>
      </div>
      <div class="field">
        <div class="field-label">Company</div>
        <div class="field-value">${data.company || "—"}</div>
      </div>
      <div class="divider"></div>
      <div class="field">
        <div class="field-label">Budget Range</div>
        <div class="field-value">${data.budget || "Not specified"}</div>
      </div>
      <div class="field">
        <div class="field-label">Service Interest</div>
        <div class="field-value">${data.service || "Not specified"}</div>
      </div>
      <div class="divider"></div>
      <div class="field">
        <div class="field-label">Project Description</div>
        <div class="field-value">${data.description}</div>
      </div>
    </div>
    <div class="footer">
      Ace Intelligence Systems &copy; ${new Date().getFullYear()}
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, budget, service, description } = body;

    if (!name || !email || !description) {
      return NextResponse.json(
        { error: "Name, email, and description are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_SMTP_FROM,
        pass: GMAIL_SMTP_PASS,
      },
    });

    const html = buildEmailHtml({ name, email, company, budget, service, description });

    await transporter.sendMail({
      from: GMAIL_SMTP_FROM,
      to: RECIPIENTS.join(", "),
      subject: `New Project Inquiry from ${name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
