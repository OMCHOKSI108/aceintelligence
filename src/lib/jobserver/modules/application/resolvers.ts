import {
  submitApplication,
  getApplicationsByJob,
  listApplicationsForJob,
  updateApplicationStage,
} from "./service";
import { Candidate } from "../../models/Candidate";

export const applicationResolvers = {
  Query: {
    getApplicationsByJob: (_parent: unknown, args: { jobId: string }) =>
      getApplicationsByJob(args.jobId),
    listApplicationsForJob: (_parent: unknown, args: { jobId: string }) =>
      listApplicationsForJob(args.jobId),
  },
  Mutation: {
    submitApplication: async (
      _parent: unknown,
      args: {
        input: {
          jobId: string;
          phone: string;
          resumeFileName: string;
          resumeMimeType: string;
          resumeBase64: string;
        };
      },
      ctx: any,
    ) => {
      if (!ctx.user?.userId || ctx.user.role !== "CANDIDATE") {
        throw new Error("You must be logged in to apply");
      }
      const candidate = await Candidate.findByPk(ctx.user.userId);
      if (!candidate) throw new Error("Candidate not found");

      return submitApplication({
        name: candidate.name,
        email: candidate.email,
        phone: args.input.phone,
        jobId: args.input.jobId,
        resumeFileName: args.input.resumeFileName,
        resumeMimeType: args.input.resumeMimeType,
        resumeBase64: args.input.resumeBase64,
      });
    },
    updateApplicationStage: (_parent: unknown, args: { applicationId: string; stage: string }) =>
      updateApplicationStage(args.applicationId, args.stage as any),
  },
};
