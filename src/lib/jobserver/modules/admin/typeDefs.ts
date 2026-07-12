import gql from "graphql-tag";

export const adminTypeDefs = gql`
  type AdminProfile {
    id: ID!
    loginId: String!
    email: String!
    name: String!
    role: Role!
    phone: String
    bio: String
    profilePhoto: String
    createdAt: String!
    updatedAt: String!
  }

  input CreateAdminInput {
    name: String!
    email: String!
    password: String!
    phone: String
    bio: String
    profilePhoto: String
  }

  input UpdateAdminInput {
    name: String
    phone: String
    bio: String
    profilePhoto: String
  }

  input UpdateProfileInput {
    name: String
    phone: String
    bio: String
    profilePhoto: String
  }

  input ChangePasswordInput {
    oldPassword: String!
    newPassword: String!
  }

  extend type Query {
    listAdmins: [AdminProfile!]! @hasRole(role: SUPER_ADMIN)
    getAdminById(id: ID!): AdminProfile @hasRole(role: SUPER_ADMIN)
  }

  extend type Mutation {
    createAdmin(input: CreateAdminInput!): AdminProfile! @hasRole(role: SUPER_ADMIN)
    updateAdmin(id: ID!, input: UpdateAdminInput!): AdminProfile! @hasRole(role: SUPER_ADMIN)
    deleteAdmin(id: ID!): Boolean! @hasRole(role: SUPER_ADMIN)
    updateOwnProfile(input: UpdateProfileInput!): AdminProfile! @hasRole(role: ADMIN)
    changePassword(input: ChangePasswordInput!): Boolean! @hasRole(role: ADMIN)
  }
`;
