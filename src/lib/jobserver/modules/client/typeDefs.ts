import gql from "graphql-tag";

export const clientTypeDefs = gql`
  enum WorkStatus {
    NOT_STARTED
    IN_PROGRESS
    REVIEW
    COMPLETED
    ON_HOLD
  }

  enum DocumentType {
    PDF
    MARKDOWN
    IMAGE
    OTHER
  }

  type Client {
    id: ID!
    loginId: String!
    email: String!
    name: String!
    phone: String
    companyName: String
    workStatus: WorkStatus!
    googleChatLink: String
    notes: String
    createdAt: String!
    updatedAt: String!
  }

  type ClientDocument {
    id: ID!
    clientId: String!
    fileName: String!
    fileType: DocumentType!
    fileUrl: String!
    fileSize: Int!
    uploadedBy: String!
    createdAt: String!
  }

  type ClientWithDocs {
    client: Client!
    documents: [ClientDocument!]!
  }

  input CreateClientInput {
    name: String!
    email: String!
    password: String!
    phone: String
    companyName: String
    googleChatLink: String
    notes: String
  }

  input UpdateClientInput {
    name: String
    phone: String
    companyName: String
    workStatus: WorkStatus
    googleChatLink: String
    notes: String
  }

  input UpdateClientPasswordInput {
    newPassword: String!
  }

  extend type Query {
    listClients: [Client!]! @hasRole(role: ADMIN)
    getClientById(id: ID!): ClientWithDocs @hasRole(role: ADMIN)
    getClientPortal: ClientWithDocs @hasRole(role: CLIENT)
  }

  extend type Mutation {
    createClient(input: CreateClientInput!): Client! @hasRole(role: ADMIN)
    updateClient(id: ID!, input: UpdateClientInput!): Client! @hasRole(role: ADMIN)
    deleteClient(id: ID!): Boolean! @hasRole(role: SUPER_ADMIN)
    updateClientPassword(id: ID!, input: UpdateClientPasswordInput!): Boolean! @hasRole(role: ADMIN)
    updateClientWorkStatus(id: ID!, status: WorkStatus!): Client! @hasRole(role: ADMIN)
    deleteClientDocument(id: ID!): Boolean! @hasRole(role: ADMIN)
  }
`;
