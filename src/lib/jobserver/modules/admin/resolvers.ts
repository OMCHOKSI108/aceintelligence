import {
  createAdmin,
  listAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  updateOwnProfile,
  changePassword,
} from "./service";
import { safeError } from "../../security";

export const adminResolvers = {
  Query: {
    listAdmins: async () => {
      try {
        return await listAdmins();
      } catch (err) {
        throw new Error(safeError(err));
      }
    },
    getAdminById: async (_parent: unknown, args: { id: string }) => {
      try {
        return await getAdminById(args.id);
      } catch (err) {
        throw new Error(safeError(err));
      }
    },
  },
  Mutation: {
    createAdmin: async (
      _parent: unknown,
      args: {
        input: {
          name: string;
          email: string;
          password: string;
          phone?: string;
          bio?: string;
          profilePhoto?: string;
        };
      },
    ) => {
      try {
        return await createAdmin(args.input);
      } catch (err) {
        throw new Error(safeError(err));
      }
    },

    updateAdmin: async (
      _parent: unknown,
      args: {
        id: string;
        input: { name?: string; phone?: string; bio?: string; profilePhoto?: string };
      },
    ) => {
      try {
        return await updateAdmin(args.id, args.input);
      } catch (err) {
        throw new Error(safeError(err));
      }
    },

    deleteAdmin: async (_parent: unknown, args: { id: string }) => {
      try {
        return await deleteAdmin(args.id);
      } catch (err) {
        throw new Error(safeError(err));
      }
    },

    updateOwnProfile: async (
      _parent: unknown,
      args: { input: { name?: string; phone?: string; bio?: string; profilePhoto?: string } },
      context: { user?: { userId: string } },
    ) => {
      if (!context.user) throw new Error("Not authenticated");
      try {
        return await updateOwnProfile(context.user.userId, args.input);
      } catch (err) {
        throw new Error(safeError(err));
      }
    },

    changePassword: async (
      _parent: unknown,
      args: { input: { oldPassword: string; newPassword: string } },
      context: { user?: { userId: string } },
    ) => {
      if (!context.user) throw new Error("Not authenticated");
      try {
        return await changePassword(
          context.user.userId,
          args.input.oldPassword,
          args.input.newPassword,
        );
      } catch (err) {
        throw new Error(safeError(err));
      }
    },
  },
};
