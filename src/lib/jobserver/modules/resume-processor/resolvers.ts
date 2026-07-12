import {
  getProfile,
  listProfiles,
  getProfileStats,
  deleteProfile,
  reprocessProfile,
} from "./service";

export const resumeProcessorResolvers = {
  Query: {
    candidateProfile: (_parent: unknown, args: { id: string }) => getProfile(args.id),
    candidateProfiles: (
      _parent: unknown,
      args: {
        search?: string;
        status?: string;
        skills?: string;
        limit?: number;
        offset?: number;
      },
    ) =>
      listProfiles({
        search: args.search,
        status: args.status as any,
        skills: args.skills,
        limit: args.limit,
        offset: args.offset,
      }),
    profileStats: () => getProfileStats(),
  },
  Mutation: {
    reprocessResume: (_parent: unknown, args: { profileId: string }) =>
      reprocessProfile(args.profileId),
    deleteCandidateProfile: (_parent: unknown, args: { profileId: string }) =>
      deleteProfile(args.profileId),
  },
};
