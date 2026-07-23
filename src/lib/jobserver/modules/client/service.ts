import { Client, WorkStatus } from "../../models/Client";
import { ClientDocument } from "../../models/ClientDocument";
import { sendAdminEmail } from "../../email/send";
import { clientWelcome } from "../../email/templates";
import { hashPassword } from "../../utils/password";
import { sanitize, validatePassword, validateEmail } from "../../security";
import { auditLog } from "../../logger";

export async function generateClientLoginId(): Promise<string> {
  const last = await Client.unscoped().findOne({
    order: [["loginId", "DESC"]],
    attributes: ["loginId"],
  });

  let next = 1;
  if (last) {
    const num = parseInt(last.loginId.replace("CLI-", ""), 10);
    if (!isNaN(num)) next = num + 1;
  }

  return `CLI-${String(next).padStart(4, "0")}`;
}

export async function createClient(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  companyName?: string;
  googleChatLink?: string;
  notes?: string;
}) {
  const pwCheck = validatePassword(input.password);
  if (!pwCheck.valid) throw new Error(pwCheck.error!);

  if (!validateEmail(input.email)) throw new Error("Invalid email address");

  const name = sanitize(input.name);
  const email = input.email.trim().toLowerCase();
  const phone = input.phone ? sanitize(input.phone) : null;
  const companyName = input.companyName ? sanitize(input.companyName) : null;
  const googleChatLink = input.googleChatLink ? sanitize(input.googleChatLink) : null;
  const notes = input.notes ? sanitize(input.notes) : null;

  const existingClient = await Client.findOne({
    where: { email },
    paranoid: false,
  });

  if (existingClient) {
    if (existingClient.deletedAt) {
      const passwordHash = await hashPassword(input.password);
      await existingClient.restore();
      await existingClient.update({
        name,
        passwordHash,
        phone,
        companyName,
        googleChatLink,
        notes,
      });

      auditLog("CLIENT_RESTORED", { loginId: existingClient.loginId, email });

      const { subject, html } = clientWelcome(name, existingClient.loginId, input.password);
      await sendAdminEmail(email, subject, html);

      return existingClient;
    }

    throw new Error("A client with this email already exists");
  }

  const loginId = await generateClientLoginId();
  const passwordHash = await hashPassword(input.password);

  const client = await Client.create({
    loginId,
    email,
    passwordHash,
    name,
    phone,
    companyName,
    googleChatLink,
    notes,
    workStatus: WorkStatus.NOT_STARTED,
  });

  auditLog("CLIENT_CREATED", { loginId, email });

  const { subject, html } = clientWelcome(name, loginId, input.password);
  await sendAdminEmail(email, subject, html);

  return client;
}

export async function listClients() {
  return Client.findAll({ order: [["createdAt", "DESC"]] });
}

export async function getClientById(id: string) {
  const client = await Client.findByPk(id);
  if (!client) throw new Error("Client not found");

  const documents = await ClientDocument.findAll({
    where: { clientId: id },
    order: [["createdAt", "DESC"]],
  });

  return { client, documents };
}

export async function getClientPortal(userId: string) {
  const client = await Client.findByPk(userId);
  if (!client) throw new Error("Client not found");

  const documents = await ClientDocument.findAll({
    where: { clientId: userId },
    order: [["createdAt", "DESC"]],
  });

  return { client, documents };
}

export async function updateClient(
  id: string,
  input: {
    name?: string;
    phone?: string;
    companyName?: string;
    workStatus?: WorkStatus;
    googleChatLink?: string;
    notes?: string;
  },
) {
  const client = await Client.findByPk(id);
  if (!client) throw new Error("Client not found");

  const updates: Record<string, unknown> = {};
  if (input.name !== undefined) updates.name = sanitize(input.name);
  if (input.phone !== undefined) updates.phone = input.phone ? sanitize(input.phone) : null;
  if (input.companyName !== undefined)
    updates.companyName = input.companyName ? sanitize(input.companyName) : null;
  if (input.workStatus !== undefined) updates.workStatus = input.workStatus;
  if (input.googleChatLink !== undefined)
    updates.googleChatLink = input.googleChatLink ? sanitize(input.googleChatLink) : null;
  if (input.notes !== undefined) updates.notes = input.notes ? sanitize(input.notes) : null;

  await client.update(updates);
  auditLog("CLIENT_UPDATED", { id, fields: Object.keys(updates) });
  return client;
}

export async function deleteClient(id: string) {
  const client = await Client.findByPk(id);
  if (!client) throw new Error("Client not found");

  const { name, loginId, email } = client;
  await client.destroy();

  auditLog("CLIENT_DELETED", { id, loginId, email });
  return true;
}

export async function updateClientPassword(id: string, newPassword: string) {
  const client = await Client.findByPk(id);
  if (!client) throw new Error("Client not found");

  const pwCheck = validatePassword(newPassword);
  if (!pwCheck.valid) throw new Error(pwCheck.error!);

  const passwordHash = await hashPassword(newPassword);
  await client.update({ passwordHash });

  auditLog("CLIENT_PASSWORD_CHANGED", { id, loginId: client.loginId });
  return true;
}

export async function updateClientWorkStatus(id: string, status: WorkStatus) {
  const client = await Client.findByPk(id);
  if (!client) throw new Error("Client not found");

  await client.update({ workStatus: status });
  auditLog("CLIENT_STATUS_UPDATED", { id, status });
  return client;
}

export async function deleteClientDocument(id: string) {
  const doc = await ClientDocument.findByPk(id);
  if (!doc) throw new Error("Document not found");

  const { unlinkSync, existsSync } = await import("fs");
  const filePath = process.cwd() + "/public" + doc.fileUrl;
  if (existsSync(filePath)) {
    unlinkSync(filePath);
  }

  await doc.destroy();
  auditLog("CLIENT_DOCUMENT_DELETED", { id, clientId: doc.clientId, fileName: doc.fileName });
  return true;
}
