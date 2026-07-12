import gql from "graphql-tag";

export const employeeTypeDefs = gql`
  type EmployeeUser {
    id: ID!
    loginId: String!
    email: String!
    role: Role!
    name: String!
    phone: String
    createdAt: String!
  }

  extend type Mutation {
    createEmployeeLogin(applicationId: String!): EmployeeUser! @hasRole(role: ADMIN)
  }
`;
