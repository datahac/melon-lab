// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '~/schema/schema.gql';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

export const createErrorLink = () =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        console.log(
          '[GQL ERROR]: Message: %s, Path: %s, Locations: %o',
          message,
          path && path.join('.'),
          locations,
        );

        const stacktrace =
          extensions && extensions.exception && extensions.exception.stacktrace;
        if (stacktrace && stacktrace.length) {
          stacktrace.forEach(line => {
            console.log(line);
          });
        }
      });
    }

    if (networkError) {
      console.log('[GQL NETWORK ERROR]: %o', networkError);
    }
  });

export const createCache = () => {
  const cache = new InMemoryCache({
    addTypename: true,
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: introspection,
    }),
  });

  return cache;
};
