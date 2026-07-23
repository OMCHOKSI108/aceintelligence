import gql from "graphql-tag";

export const candidateTypeDefs = gql`
  type Candidate {
    id: ID!
    email: String!
    name: String!
    phone: String
    verified: Boolean!
    createdAt: String!
  }

  type CandidateAuthPayload {
    token: String!
    candidate: Candidate!
  }

  extend type Mutation {
    candidateRegister(email: String!, password: String!, name: String!, phone: String, returnTo: String): Candidate!
    candidateVerify(token: String!): Boolean!
    candidateLogin(email: String!, password: String!): CandidateAuthPayload!
  }

  extend type Query {
    me: Candidate
  }
`;
