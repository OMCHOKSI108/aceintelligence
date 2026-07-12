import { scheduleInterview } from "./service";

export const interviewResolvers = {
  Mutation: {
    scheduleInterview: (_parent: unknown, args: { input: any }) =>
      scheduleInterview(args.input.applicationId, {
        scheduledAt: args.input.scheduledAt,
        mode: args.input.mode,
        location: args.input.location,
        interviewerName: args.input.interviewerName,
        notes: args.input.notes,
      }),
  },
};
