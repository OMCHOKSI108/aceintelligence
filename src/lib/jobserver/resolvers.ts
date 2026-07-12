import { authResolvers } from "./modules/auth/resolvers";
import { adminResolvers } from "./modules/admin/resolvers";
import { jobResolvers } from "./modules/job/resolvers";
import { applicationResolvers } from "./modules/application/resolvers";
import { interviewResolvers } from "./modules/interview/resolvers";
import { employeeResolvers } from "./modules/employee/resolvers";
import { candidateResolvers } from "./modules/candidate/resolvers";
import { resumeProcessorResolvers } from "./modules/resume-processor/resolvers";

export const resolvers = {
  Query: {
    health: () => ({
      status: "ok",
      timestamp: new Date().toISOString(),
    }),
    ...adminResolvers.Query,
    ...jobResolvers.Query,
    ...applicationResolvers.Query,
    ...candidateResolvers.Query,
    ...resumeProcessorResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...adminResolvers.Mutation,
    ...jobResolvers.Mutation,
    ...applicationResolvers.Mutation,
    ...interviewResolvers.Mutation,
    ...employeeResolvers.Mutation,
    ...candidateResolvers.Mutation,
    ...resumeProcessorResolvers.Mutation,
  },
};
