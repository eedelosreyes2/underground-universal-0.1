import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Link {
    id: String
    title: String
    description: String
    url: String
    category: String
    imageUrl: String
    users: [String]
  }

  type Query {
    links: [Link]!
    artists: [Artist]!
  }

  type Artist {
    id: String
    email: String

    status: String
    name: String
    location: String
    badgeId: String
    trackId: String
  }
`;
