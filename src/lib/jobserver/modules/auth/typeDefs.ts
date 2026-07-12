import gql from "graphql-tag";

export const authTypeDefs = gql`
  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Mutation {
    login(loginId: String!, password: String!): AuthPayload!
  }
`;
