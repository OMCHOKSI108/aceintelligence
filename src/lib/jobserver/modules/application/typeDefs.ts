import gql from "graphql-tag";

export const applicationTypeDefs = gql`
  type Application {
    id: ID!
    name: String!
    email: String!
    phone: String!
    jobId: String!
    stage: ApplicationStage!
    appliedAt: String!
    createdAt: String!
    updatedAt: String!
  }

  type ApplicationTableRow {
    id: ID!
    name: String!
    email: String!
    phone: String!
    appliedAt: String!
    resumeFileId: ID
    stage: ApplicationStage!
  }

  enum ApplicationStage {
    RECRUITER_PHASE
    ON_HOLD
    SHORTLISTED
    REJECTED
    SELECTED
  }

  input SubmitApplicationInput {
    jobId: String!
    phone: String!
    resumeFileName: String!
    resumeMimeType: String!
    resumeBase64: String!
  }

  extend type Query {
    getApplicationsByJob(jobId: String!): [Application!]! @hasRole(role: ADMIN)
    listApplicationsForJob(jobId: String!): [ApplicationTableRow!]! @hasRole(role: ADMIN)
  }

  extend type Mutation {
    submitApplication(input: SubmitApplicationInput!): Application!
    updateApplicationStage(applicationId: String!, stage: ApplicationStage!): Application!
      @hasRole(role: ADMIN)
  }
`;
