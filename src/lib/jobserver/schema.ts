import gql from "graphql-tag";
import { authTypeDefs } from "./modules/auth/typeDefs";
import { adminTypeDefs } from "./modules/admin/typeDefs";
import { jobTypeDefs } from "./modules/job/typeDefs";
import { applicationTypeDefs } from "./modules/application/typeDefs";
import { interviewTypeDefs } from "./modules/interview/typeDefs";
import { employeeTypeDefs } from "./modules/employee/typeDefs";
import { candidateTypeDefs } from "./modules/candidate/typeDefs";
import { resumeProcessorTypeDefs } from "./modules/resume-processor/typeDefs";

const rootTypeDefs = gql`
  directive @hasRole(role: Role!) on FIELD_DEFINITION

  enum Role {
    SUPER_ADMIN
    ADMIN
    EMPLOYEE
    CANDIDATE
  }

  type User {
    id: ID!
    loginId: String!
    email: String!
    role: Role!
    name: String!
    phone: String
    bio: String
    profilePhoto: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Health {
    status: String!
    timestamp: String!
  }

  extend type Query {
    health: Health!
  }
`;

export const typeDefs = [
  rootTypeDefs,
  authTypeDefs,
  adminTypeDefs,
  jobTypeDefs,
  applicationTypeDefs,
  interviewTypeDefs,
  employeeTypeDefs,
  candidateTypeDefs,
  resumeProcessorTypeDefs,
];
