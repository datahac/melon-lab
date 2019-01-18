// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '~/schema/schema.gql';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import withApollo from 'next-with-apollo';
import { Query as QueryBase } from 'react-apollo';
import { createIpcLink } from '~/shared/graphql/client';

export { Subscription } from 'react-apollo';
export { Mutation } from 'react-apollo';

// We must disable SSR in the electron app. Hence, we re-export
// the query components here so we can override the ssr flag.
export const Query = ({ errorPolicy, ...props }) => (
  <QueryBase {...props} errorPolicy={errorPolicy || 'all'} ssr={false} />
);

const createLink = () => {
  const ipcLink = createIpcLink({ ipc: global.ipcRenderer });
  const errorLink = createErrorLink();
  return ApolloLink.from([errorLink, ipcLink]);
};

const createErrorLink = () => {
  return onError(({ graphQLErrors, networkError }) => {
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
};

const createCache = () => {
  const cache = new InMemoryCache({
    addTypename: true,
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: introspection,
    }),
  });

  return cache;
};

const createClient = () => {
  const client = new ApolloClient({
    queryDeduplication: false,
    ssrMode: !process.browser,
    link: createLink(),
    cache: createCache(),
  });

  return client;
};

export default withApollo(options => createClient());
