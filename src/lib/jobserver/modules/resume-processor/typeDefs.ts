import gql from "graphql-tag";

export const resumeProcessorTypeDefs = gql`
  type CandidateProfile {
    id: ID!
    resumeFileId: ID
    candidateId: ID
    applicationId: ID
    uploadedBy: ID!
    fileName: String!
    mimeType: String!
    size: Int!
    rawExtractedText: String
    profileData: ProfileData
    status: ProfileStatus!
    processedAt: String
    errorMessage: String
    createdAt: String!
    updatedAt: String!
  }

  type ProfileData {
    name: String
    email: String
    phone: String
    summary: String
    skills: [String!]
    experience: [ExperienceEntry!]
    education: [EducationEntry!]
    certifications: [String!]
    projects: [ProjectEntry!]
    linkedIn: String
    github: String
  }

  type ExperienceEntry {
    title: String
    company: String
    duration: String
    description: String
  }

  type EducationEntry {
    degree: String
    institution: String
    year: String
  }

  type ProjectEntry {
    name: String
    description: String
    url: String
  }

  type ProfileStats {
    total: Int!
    completed: Int!
    processing: Int!
    pending: Int!
    failed: Int!
  }

  enum ProfileStatus {
    PENDING
    PROCESSING
    COMPLETED
    FAILED
  }

  extend type Query {
    candidateProfile(id: ID!): CandidateProfile
    candidateProfiles(
      search: String
      status: ProfileStatus
      skills: String
      limit: Int
      offset: Int
    ): [CandidateProfile!]! @hasRole(role: ADMIN)
    profileStats: ProfileStats! @hasRole(role: ADMIN)
  }

  extend type Mutation {
    reprocessResume(profileId: ID!): CandidateProfile! @hasRole(role: ADMIN)
    deleteCandidateProfile(profileId: ID!): Boolean! @hasRole(role: ADMIN)
  }
`;
