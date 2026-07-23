import { candidateRegister, candidateVerify, candidateLogin } from "./service";
import { Candidate } from "../../models/Candidate";

export const candidateResolvers = {
  Query: {
    me: (_parent: unknown, _args: unknown, ctx: any) => {
      if (!ctx.user?.userId) return null;
      return Candidate.findByPk(ctx.user.userId);
    },
  },
  Mutation: {
    candidateRegister: (
      _parent: unknown,
      args: { email: string; password: string; name: string; phone?: string; returnTo?: string },
    ) => candidateRegister(args),

    candidateVerify: (_parent: unknown, args: { token: string }) => candidateVerify(args.token),

    candidateLogin: (_parent: unknown, args: { email: string; password: string }) =>
      candidateLogin(args.email, args.password),
  },
};
