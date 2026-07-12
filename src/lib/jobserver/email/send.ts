import { Resend } from "resend";
import nodemailer from "nodemailer";

let resend: Resend | null = null;
let transporter: nodemailer.Transporter | null = null;

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY || "";
  if (!key) {
    console.warn("[EMAIL] RESEND_API_KEY not set — emails will be logged only");
    return null;
  }
  if (!resend) resend = new Resend(key);
  return resend;
}

function getTransporter(): nodemailer.Transporter | null {
  const user = process.env.GMAIL_USER || "";
  const pass = process.env.GMAIL_PASS || "";
  if (!user || !pass) {
    console.warn("[EMAIL] GMAIL_USER/GMAIL_PASS not set — admin emails will be logged only");
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return transporter;
}

/** Send via Resend — candidate-facing and general emails */
export async function sendEmail(to: string, subject: string, html: string) {
  const client = getResendClient();
  if (!client) {
    console.log(`[EMAIL RESEND LOG] To: ${to} | Subject: ${subject}`);
    return;
  }
  const from = process.env.EMAIL_FROM || "aceintelligencejobs <noreply@aceintelligence.systems>";
  await client.emails.send({ from, to, subject, html });
}

/** Send via Nodemailer/Gmail — internal admin emails */
export async function sendAdminEmail(to: string, subject: string, html: string) {
  const t = getTransporter();
  if (!t) {
    console.log(`[EMAIL GMAIL LOG] To: ${to} | Subject: ${subject}`);
    return;
  }
  const from = process.env.GMAIL_USER || "";
  await t.sendMail({ from, to, subject, html });
}
