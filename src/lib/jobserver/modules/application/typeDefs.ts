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

  type CandidateApplication {
    id: ID!
    jobId: String!
    jobTitle: String!
    location: String!
    employmentType: EmploymentType!
    stage: ApplicationStage!
    appliedAt: String!
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
    applicationAnswers: String
  }

  extend type Query {
    getApplicationsByJob(jobId: String!): [Application!]! @hasRole(role: ADMIN)
    listApplicationsForJob(jobId: String!): [ApplicationTableRow!]! @hasRole(role: ADMIN)
    myApplications: [CandidateApplication!]! @hasRole(role: CANDIDATE)
  }

  extend type Mutation {
    submitApplication(input: SubmitApplicationInput!): Application!
    updateApplicationStage(applicationId: String!, stage: ApplicationStage!): Application!
      @hasRole(role: ADMIN)
  }
`;
