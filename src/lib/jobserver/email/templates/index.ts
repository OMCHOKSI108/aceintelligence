const WRAPPER = (content: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Segoe UI,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e0e0e0;">
  <tr><td style="padding:32px 40px;">
    ${content}
  </td></tr>
  <tr><td style="padding:16px 40px;border-top:1px solid #e0e0e0;font-size:12px;color:#888;">
    This email was sent by IntelligenceJobs. Your privacy is important to us.
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

export function applicationReceived(
  name: string,
  jobTitle: string,
  jobId: string,
): { subject: string; html: string } {
  return {
    subject: `Application Received — ${jobTitle} (${jobId})`,
    html: WRAPPER(`
      <h2 style="margin:0 0 8px;font-size:20px;color:#333;">IntelligenceJobs</h2>
      <hr style="border:none;border-top:2px solid #0078d4;margin:16px 0;"/>

      <p style="font-size:15px;color:#333;">Hi ${name},</p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        Thank you for taking the time to submit your application for
        <strong style="color:#0078d4;">${jobTitle}</strong>
        (Job number: <strong>${jobId}</strong>).
        We're glad you're interested in a career with us, and we're here to help you find your next role.
      </p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        You may not receive feedback from us on your application directly, but please know that
        it's being evaluated, and you'll hear from us as soon as the review process is complete.
        If you're selected for an interview, you'll be notified by the recruiting team.
      </p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        Updates regarding your application status can be tracked through your dashboard on IntelligenceJobs.
        If you see the job moved to an inactive state, that means the position is either no longer open,
        you withdrew from consideration, or you were not selected for the role.
      </p>

      <h3 style="font-size:16px;color:#333;margin:24px 0 8px;">How's your profile?</h3>
      <p style="font-size:15px;color:#333;line-height:1.7;">
        A key part of the review process is evaluating your profile in relation to the job requirements,
        so please make sure your profile is accurate and extensive — it's our first step in getting to know you!
        We encourage you to check back frequently and continue to look for opportunities that match your interests,
        as new jobs are being posted regularly.
      </p>

      <p style="font-size:15px;color:#333;line-height:1.7;">Thank you,<br/><strong>IntelligenceJobs Recruiting</strong></p>
    `),
  };
}

export function emailVerification(
  name: string,
  verifyLink: string,
): { subject: string; html: string } {
  return {
    subject: `Verify your email — IntelligenceJobs`,
    html: WRAPPER(`
      <h2 style="margin:0 0 8px;font-size:20px;color:#333;">IntelligenceJobs</h2>
      <hr style="border:none;border-top:2px solid #0078d4;margin:16px 0;"/>

      <p style="font-size:15px;color:#333;">Hi ${name},</p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        Thanks for signing up for IntelligenceJobs. Please verify your email address to activate your account.
      </p>

      <p style="text-align:center;margin:32px 0;">
        <a href="${verifyLink}"
           style="display:inline-block;padding:12px 32px;background:#0078d4;color:#fff;text-decoration:none;font-size:15px;font-weight:bold;">
          Verify Email
        </a>
      </p>

      <p style="font-size:13px;color:#888;">
        If you didn't create an account, you can safely ignore this email.
      </p>

      <p style="font-size:15px;color:#333;">Thank you,<br/><strong>IntelligenceJobs Team</strong></p>
    `),
  };
}

export function stageChanged(
  name: string,
  jobTitle: string,
  stage: string,
): { subject: string; html: string } {
  const readable: Record<string, string> = {
    RECRUITER_PHASE: "Under Review",
    ON_HOLD: "On Hold",
    SHORTLISTED: "Shortlisted",
    REJECTED: "Not Selected",
    SELECTED: "Selected",
  };
  return {
    subject: `Application Update — ${jobTitle}`,
    html: WRAPPER(`
      <h2 style="margin:0 0 8px;font-size:20px;color:#333;">IntelligenceJobs</h2>
      <hr style="border:none;border-top:2px solid #0078d4;margin:16px 0;"/>

      <p style="font-size:15px;color:#333;">Hi ${name},</p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        We wanted to let you know that your application for
        <strong style="color:#0078d4;">${jobTitle}</strong>
        has been updated.
      </p>

      <table cellpadding="12" cellspacing="0" style="border:1px solid #e0e0e0;margin:16px 0;width:100%;">
        <tr>
          <td style="font-size:14px;color:#666;">Current Status</td>
          <td style="font-size:14px;font-weight:bold;color:#333;">${readable[stage] || stage}</td>
        </tr>
      </table>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        We'll keep you updated on the next steps. You can also track your application status on your IntelligenceJobs dashboard.
      </p>

      <p style="font-size:15px;color:#333;">Thank you,<br/><strong>IntelligenceJobs Recruiting</strong></p>
    `),
  };
}

export function interviewInvite(
  name: string,
  jobTitle: string,
  date: string,
  mode: string,
  location: string,
  interviewer: string,
): { subject: string; html: string } {
  return {
    subject: `Interview Scheduled — ${jobTitle}`,
    html: WRAPPER(`
      <h2 style="margin:0 0 8px;font-size:20px;color:#333;">IntelligenceJobs</h2>
      <hr style="border:none;border-top:2px solid #0078d4;margin:16px 0;"/>

      <p style="font-size:15px;color:#333;">Hi ${name},</p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        Congratulations! You've been shortlisted for an interview for
        <strong style="color:#0078d4;">${jobTitle}</strong>.
      </p>

      <table cellpadding="12" cellspacing="0" style="border:1px solid #e0e0e0;margin:16px 0;width:100%;">
        <tr><td style="font-size:14px;color:#666;width:140px;">Position</td><td style="font-size:14px;font-weight:bold;">${jobTitle}</td></tr>
        <tr style="background:#f9f9f9;"><td style="font-size:14px;color:#666;">Date / Time</td><td style="font-size:14px;">${date}</td></tr>
        <tr><td style="font-size:14px;color:#666;">Mode</td><td style="font-size:14px;">${mode === "ONLINE" ? "Online (Video Call)" : "In Person"}</td></tr>
        <tr style="background:#f9f9f9;"><td style="font-size:14px;color:#666;">${mode === "ONLINE" ? "Meeting Link" : "Location"}</td><td style="font-size:14px;">${location}</td></tr>
        <tr><td style="font-size:14px;color:#666;">Interviewer</td><td style="font-size:14px;">${interviewer}</td></tr>
      </table>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        Please be available 10 minutes before the scheduled time.
        If you need to reschedule, contact us as soon as possible.
      </p>

      <p style="font-size:15px;color:#333;">Best of luck,<br/><strong>IntelligenceJobs Recruiting</strong></p>
    `),
  };
}

export function selected(name: string, jobTitle: string): { subject: string; html: string } {
  return {
    subject: `Congratulations! You're Selected — ${jobTitle}`,
    html: WRAPPER(`
      <h2 style="margin:0 0 8px;font-size:20px;color:#333;">IntelligenceJobs</h2>
      <hr style="border:none;border-top:2px solid #0078d4;margin:16px 0;"/>

      <p style="font-size:15px;color:#333;">Hi ${name},</p>

      <p style="font-size:17px;color:#0078d4;font-weight:bold;margin:16px 0;">
        Great news! You've been selected.
      </p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        We're pleased to inform you that you've been selected for the position of
        <strong style="color:#0078d4;">${jobTitle}</strong>.
        Our HR team will reach out with your onboarding details and employee credentials shortly.
      </p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        Welcome to the team! We're excited to have you on board.
      </p>

      <p style="font-size:15px;color:#333;">Best,<br/><strong>IntelligenceJobs Recruiting</strong></p>
    `),
  };
}

export function employeeCredentials(
  name: string,
  loginId: string,
  password: string,
): { subject: string; html: string } {
  return {
    subject: `Your Employee Account is Ready`,
    html: WRAPPER(`
      <h2 style="margin:0 0 8px;font-size:20px;color:#333;">IntelligenceJobs</h2>
      <hr style="border:none;border-top:2px solid #0078d4;margin:16px 0;"/>

      <p style="font-size:15px;color:#333;">Hi ${name},</p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        Your employee account has been created. Here are your login credentials:
      </p>

      <table cellpadding="12" cellspacing="0" style="border:1px solid #e0e0e0;margin:16px 0;width:100%;">
        <tr><td style="font-size:14px;color:#666;width:120px;">Login ID</td><td style="font-size:14px;font-weight:bold;">${loginId}</td></tr>
        <tr style="background:#f9f9f9;"><td style="font-size:14px;color:#666;">Password</td><td style="font-size:14px;">${password}</td></tr>
      </table>

      <p style="font-size:15px;color:#c00;font-weight:bold;">
        Please change your password after first login.
      </p>

      <p style="font-size:15px;color:#333;">Best,<br/><strong>IntelligenceJobs Team</strong></p>
    `),
  };
}

export function adminCredentials(
  name: string,
  loginId: string,
  password: string,
): { subject: string; html: string } {
  return {
    subject: `Your Admin Account is Ready`,
    html: WRAPPER(`
      <h2 style="margin:0 0 8px;font-size:20px;color:#333;">IntelligenceJobs</h2>
      <hr style="border:none;border-top:2px solid #0078d4;margin:16px 0;"/>

      <p style="font-size:15px;color:#333;">Hi ${name},</p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        Your admin account has been created. Here are your login credentials:
      </p>

      <table cellpadding="12" cellspacing="0" style="border:1px solid #e0e0e0;margin:16px 0;width:100%;">
        <tr><td style="font-size:14px;color:#666;width:120px;">Login ID</td><td style="font-size:14px;font-weight:bold;">${loginId}</td></tr>
        <tr style="background:#f9f9f9;"><td style="font-size:14px;color:#666;">Password</td><td style="font-size:14px;">${password}</td></tr>
      </table>

      <p style="font-size:15px;color:#c00;font-weight:bold;">
        Please change your password after first login.
      </p>

      <p style="font-size:15px;color:#333;">Best,<br/><strong>IntelligenceJobs Team</strong></p>
    `),
  };
}

export function newJobPosted(
  jobTitle: string,
  company: string,
  location: string,
): { subject: string; html: string } {
  return {
    subject: `New Job Opening — ${jobTitle}`,
    html: WRAPPER(`
      <h2 style="margin:0 0 8px;font-size:20px;color:#333;">IntelligenceJobs</h2>
      <hr style="border:none;border-top:2px solid #0078d4;margin:16px 0;"/>

      <p style="font-size:17px;color:#333;font-weight:bold;">New opportunity!</p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        <strong>${company}</strong> just posted a new position:
        <strong style="color:#0078d4;">${jobTitle}</strong> in ${location}.
      </p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        Visit IntelligenceJobs to view the full job description and apply.
      </p>

      <p style="font-size:15px;color:#333;">—<br/><strong>IntelligenceJobs Team</strong></p>
    `),
  };
}

export function adminRemoved(name: string, loginId: string): { subject: string; html: string } {
  return {
    subject: `Your Admin Account Has Been Removed`,
    html: WRAPPER(`
      <h2 style="margin:0 0 8px;font-size:20px;color:#333;">IntelligenceJobs</h2>
      <hr style="border:none;border-top:2px solid #c00;margin:16px 0;"/>

      <p style="font-size:15px;color:#333;">Hi ${name},</p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        We're writing to inform you that your admin account
        (<strong>${loginId}</strong>) has been removed from IntelligenceJobs.
      </p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        You will no longer be able to log in or access the admin panel.
        If you believe this was done in error, please contact the Super Admin.
      </p>

      <p style="font-size:15px;color:#333;">Thank you,<br/><strong>IntelligenceJobs Team</strong></p>
    `),
  };
}

export function clientWelcome(
  name: string,
  loginId: string,
  password: string,
): { subject: string; html: string } {
  const loginUrl = "https://aceintelligence.systems/careers/login";
  return {
    subject: `Welcome to Ace Intelligence Systems — Your Client Portal is Ready`,
    html: WRAPPER(`
      <h2 style="margin:0 0 8px;font-size:20px;color:#333;">Ace Intelligence Systems</h2>
      <hr style="border:none;border-top:2px solid #0078d4;margin:16px 0;"/>

      <p style="font-size:15px;color:#333;">Hi ${name},</p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        Welcome aboard! Your client portal has been created. Here you can view project documents,
        track work progress, and connect directly with our team.
      </p>

      <h3 style="font-size:16px;color:#333;margin:24px 0 8px;">Your Login Credentials</h3>

      <table cellpadding="12" cellspacing="0" style="border:1px solid #e0e0e0;margin:16px 0;width:100%;">
        <tr><td style="font-size:14px;color:#666;width:120px;">Login ID</td><td style="font-size:14px;font-weight:bold;">${loginId}</td></tr>
        <tr style="background:#f9f9f9;"><td style="font-size:14px;color:#666;">Password</td><td style="font-size:14px;">${password}</td></tr>
      </table>

      <p style="font-size:15px;color:#c00;font-weight:bold;">
        Please change your password after first login.
      </p>

      <h3 style="font-size:16px;color:#333;margin:24px 0 8px;">Getting Started</h3>

      <ol style="font-size:15px;color:#333;line-height:2;">
        <li>Log in to your client portal using the credentials above</li>
        <li>View your project documents and onboarding materials</li>
        <li>Check the work status bar to track project progress</li>
        <li>Use the Google Chat link to connect directly with our team</li>
      </ol>

      <p style="text-align:center;margin:32px 0;">
        <a href="${loginUrl}"
           style="display:inline-block;padding:12px 32px;background:#0078d4;color:#fff;text-decoration:none;font-size:15px;font-weight:bold;">
          Log In to Your Portal
        </a>
      </p>

      <p style="font-size:15px;color:#333;line-height:1.7;">
        If you have any questions, feel free to reach out through the Google Chat link in your portal.
      </p>

      <p style="font-size:15px;color:#333;">Best,<br/><strong>Ace Intelligence Systems Team</strong></p>
    `),
  };
}
