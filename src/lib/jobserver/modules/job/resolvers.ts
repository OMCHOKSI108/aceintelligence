import { createJob, publishJob, updateJob, closeJob, listJobs, getJobById } from "./service";

export const jobResolvers = {
  Query: {
    listJobs: (_parent: unknown, args: { status?: string }) => listJobs(args.status as any),
    getJobById: (_parent: unknown, args: { jobId: string }) => getJobById(args.jobId),
  },
  Mutation: {
    createJob: (_parent: unknown, args: { input: any }, context: { user?: { userId: string } }) => {
      if (!context.user) throw new Error("Not authenticated");
      return createJob(context.user.userId, args.input);
    },

    updateJob: (_parent: unknown, args: { jobId: string; input: any }) =>
      updateJob(args.jobId, args.input),

    closeJob: (_parent: unknown, args: { jobId: string }) => closeJob(args.jobId),

    publishJob: (_parent: unknown, args: { jobId: string }) => publishJob(args.jobId),
  },
};
