import { createEmployeeLogin } from "./service";

export const employeeResolvers = {
  Mutation: {
    createEmployeeLogin: (_parent: unknown, args: { applicationId: string }) =>
      createEmployeeLogin(args.applicationId),
  },
};
