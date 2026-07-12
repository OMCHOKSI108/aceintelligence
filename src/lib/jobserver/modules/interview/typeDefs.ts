import gql from "graphql-tag";

export const interviewTypeDefs = gql`
  type Interview {
    id: ID!
    applicationId: String!
    scheduledAt: String!
    mode: InterviewMode!
    location: String!
    interviewerName: String!
    notes: String
    createdAt: String!
    updatedAt: String!
  }

  enum InterviewMode {
    ONLINE
    IN_PERSON
  }

  input ScheduleInterviewInput {
    applicationId: String!
    scheduledAt: String!
    mode: InterviewMode!
    location: String!
    interviewerName: String!
    notes: String
  }

  extend type Mutation {
    scheduleInterview(input: ScheduleInterviewInput!): Interview! @hasRole(role: ADMIN)
  }
`;
