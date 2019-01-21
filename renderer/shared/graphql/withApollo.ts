import withApollo from 'next-with-apollo';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createIpcLink } from 'graphql-transport-electron';
import introspection from '~/introspection';

const createErrorLink = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        const fields = path && path.join('.');

        console.error(
          '[GQL ERROR]: Message: %s, Path: %s, Locations: %o',
          message,
          fields,
          locations,
        );

        const stacktrace =
          extensions && extensions.exception && extensions.exception.stacktrace;

        if (stacktrace && stacktrace.length) {
          stacktrace.forEach(line => {
            console.error(line);
          });
        }
      });
    }

    if (networkError) {
      console.error('[GQL NETWORK ERROR]: %o', networkError);
    }
  });
};

export default withApollo(() => {
  const ipc = global.ipcRenderer;
  const ipcLink = ipc
    ? createIpcLink({ ipc })
    : new ApolloLink(() => {
        return null;
      });

  const errorLink = createErrorLink();
  const link = ApolloLink.from([errorLink, ipcLink]);
  const cache = new InMemoryCache({
    addTypename: true,
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: introspection,
    }),
  });

  const client = new ApolloClient({
    link,
    cache,
    ssrMode: !process.browser,
  });

  return client;
});
