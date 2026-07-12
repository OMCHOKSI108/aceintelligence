import { Application, ApplicationStage } from "../../models/Application";
import { User, Role } from "../../models/User";
import { hashPassword } from "../../utils/password";
import { sendEmail } from "../../email/send";
import { employeeCredentials } from "../../email/templates";

export async function generateEmployeeLoginId(): Promise<string> {
  const last = await User.unscoped().findOne({
    where: { role: Role.EMPLOYEE },
    order: [["loginId", "DESC"]],
    attributes: ["loginId"],
  });

  let next = 1;
  if (last) {
    const num = parseInt(last.loginId.replace("EMP-", ""), 10);
    if (!isNaN(num)) next = num + 1;
  }

  return `EMP-${String(next).padStart(4, "0")}`;
}

export async function createEmployeeLogin(applicationId: string) {
  const app = await Application.findByPk(applicationId);
  if (!app) throw new Error("Application not found");
  if (app.stage !== ApplicationStage.SELECTED) {
    throw new Error("Application must be SELECTED to create employee login");
  }

  const existing = await User.findOne({ where: { email: app.email } });
  if (existing) throw new Error("User already exists for this application");

  const loginId = await generateEmployeeLoginId();
  const plainPassword = `${app.name.split(" ")[0].toLowerCase()}@${loginId}`;
  const passwordHash = await hashPassword(plainPassword);

  const user = await User.create({
    loginId,
    email: app.email,
    passwordHash,
    role: Role.EMPLOYEE,
    name: app.name,
    phone: app.phone,
  });

  const { subject, html } = employeeCredentials(app.name, loginId, plainPassword);
  await sendEmail(app.email, subject, html);

  return user;
}
