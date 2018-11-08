// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '~/schema/schema.gql';
import { InMemoryCache, IntrospectionFragmentMatcher, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { Query as QueryBase } from 'react-apollo';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

// We must disable SSR in the electron app. Hence, we re-export
// the query components here so we can override the ssr flag.
export const Query = ({ ssr, errorPolicy, ...props }) => (
  <QueryBase {...props} errorPolicy={errorPolicy || 'all'} ssr={config.isElectron ? false : ssr} />
);

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
