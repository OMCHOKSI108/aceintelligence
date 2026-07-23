import {
  createClient,
  listClients,
  getClientById,
  getClientPortal,
  updateClient,
  deleteClient,
  updateClientPassword,
  updateClientWorkStatus,
  deleteClientDocument,
} from "./service";
import { safeError } from "../../security";

export const clientResolvers = {
  Query: {
    listClients: async () => {
      try {
        return await listClients();
      } catch (err) {
        throw new Error(safeError(err));
      }
    },
    getClientById: async (_parent: unknown, args: { id: string }) => {
      try {
        return await getClientById(args.id);
      } catch (err) {
        throw new Error(safeError(err));
      }
    },
    getClientPortal: async (
      _parent: unknown,
      _args: unknown,
      context: { user?: { userId: string } },
    ) => {
      if (!context.user) throw new Error("Not authenticated");
      try {
        return await getClientPortal(context.user.userId);
      } catch (err) {
        throw new Error(safeError(err));
      }
    },
  },
  Mutation: {
    createClient: async (
      _parent: unknown,
      args: {
        input: {
          name: string;
          email: string;
          password: string;
          phone?: string;
          companyName?: string;
          googleChatLink?: string;
          notes?: string;
        };
      },
    ) => {
      try {
        return await createClient(args.input);
      } catch (err) {
        throw new Error(safeError(err));
      }
    },

    updateClient: async (
      _parent: unknown,
      args: {
        id: string;
        input: {
          name?: string;
          phone?: string;
          companyName?: string;
          workStatus?: string;
          googleChatLink?: string;
          notes?: string;
        };
      },
    ) => {
      try {
        return await updateClient(args.id, {
          ...args.input,
          workStatus: args.input.workStatus as any,
        });
      } catch (err) {
        throw new Error(safeError(err));
      }
    },

    deleteClient: async (_parent: unknown, args: { id: string }) => {
      try {
        return await deleteClient(args.id);
      } catch (err) {
        throw new Error(safeError(err));
      }
    },

    updateClientPassword: async (
      _parent: unknown,
      args: { id: string; input: { newPassword: string } },
    ) => {
      try {
        return await updateClientPassword(args.id, args.input.newPassword);
      } catch (err) {
        throw new Error(safeError(err));
      }
    },

    updateClientWorkStatus: async (
      _parent: unknown,
      args: { id: string; status: string },
    ) => {
      try {
        return await updateClientWorkStatus(args.id, args.status as any);
      } catch (err) {
        throw new Error(safeError(err));
      }
    },

    deleteClientDocument: async (_parent: unknown, args: { id: string }) => {
      try {
        return await deleteClientDocument(args.id);
      } catch (err) {
        throw new Error(safeError(err));
      }
    },
  },
};
