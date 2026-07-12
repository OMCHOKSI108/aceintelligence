import { login } from "./service";
import { safeError } from "../../security";

export const authResolvers = {
  Mutation: {
    login: async (_parent: unknown, args: { loginId: string; password: string }) => {
      try {
        return await login(args.loginId, args.password);
      } catch (err) {
        throw new Error(safeError(err));
      }
    },
  },
};
