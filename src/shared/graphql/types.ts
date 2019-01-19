import { GraphQLRequest } from 'apollo-link';

export type SerializableGraphQLRequest = GraphQLRequest & {
  query: string;
};
