// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '~/schema/schema.gql';
import { InMemoryCache, IntrospectionFragmentMatcher, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

export const createErrorLink = () => onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.log('[GQL ERROR]: Message: %s, Path: %s, Locations: %o', message, path && path.join('.'), locations);

      const stacktrace = extensions && extensions.exception && extensions.exception.stacktrace;
      if (stacktrace && stacktrace.length) {
        stacktrace.forEach((line) => {
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
    dataIdFromObject: object => {
      switch (object.__typename) {
        case 'Fund': {
          return object.address ? `fund:${object.address}` : defaultDataIdFromObject(object);
        }

        default: {
          return defaultDataIdFromObject(object);
        }
      }
    },
    cacheRedirects: {
      Query: {
        fund: (_, args, { getCacheKey }) => {
          return getCacheKey({ __typename: 'Fund', address: args.address });
        },
      },
    },
  });

  return cache;
};
