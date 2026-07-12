import gql from "graphql-tag";

export const jobTypeDefs = gql`
  type Job {
    id: ID!
    jobId: String!
    title: String!
    description: String!
    hiringOrganization: String!
    location: String!
    remote: Boolean!
    datePosted: String!
    baseSalary: Int
    employmentType: EmploymentType!
    validThrough: String
    jobBenefits: String
    experienceRequired: String
    educationRequired: String
    skills: String
    status: JobStatus!
    createdBy: String!
    createdAt: String!
    updatedAt: String!
  }

  enum EmploymentType {
    FULL_TIME
    PART_TIME
    CONTRACT
    INTERNSHIP
    TEMPORARY
  }

  enum JobStatus {
    draft
    published
    closed
    expired
  }

  input CreateJobInput {
    title: String!
    description: String!
    hiringOrganization: String!
    location: String!
    remote: Boolean
    baseSalary: Int
    employmentType: EmploymentType!
    validThrough: String
    jobBenefits: String
    experienceRequired: String
    educationRequired: String
    skills: String
  }

  input UpdateJobInput {
    title: String
    description: String
    hiringOrganization: String
    location: String
    remote: Boolean
    baseSalary: Int
    employmentType: EmploymentType
    validThrough: String
    jobBenefits: String
    experienceRequired: String
    educationRequired: String
    skills: String
  }

  extend type Query {
    listJobs(status: JobStatus): [Job!]!
    getJobById(jobId: String!): Job!
  }

  extend type Mutation {
    createJob(input: CreateJobInput!): Job! @hasRole(role: ADMIN)
    updateJob(jobId: String!, input: UpdateJobInput!): Job! @hasRole(role: ADMIN)
    closeJob(jobId: String!): Job! @hasRole(role: ADMIN)
    publishJob(jobId: String!): Job! @hasRole(role: ADMIN)
  }
`;
