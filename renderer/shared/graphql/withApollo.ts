import withApollo from 'next-with-apollo';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { IpcRenderer } from 'electron';
import introspection from '~/introspection';

const electron = !!JSON.parse(process.env.ELECTRON || 'true');
const development = process.env.NODE_ENV === 'development';

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
  const dataLink = (() => {
    if (development && !electron) {
      if (!!process.browser) {
        const { WebSocketLink } = require('apollo-link-ws');
        return new WebSocketLink({
          uri: 'ws://localhost:3030',
          options: {
            reconnect: true,
          },
        });
      }

      const { HttpLink } = require('apollo-link-http');
      return new HttpLink({ uri: 'http://localhost:3030' });
    }

    if (electron) {
      const ipc = (global as any).ipcRenderer as IpcRenderer;
      if (typeof ipc !== 'undefined') {
        const { createIpcLink } = require('graphql-transport-electron');
        return createIpcLink({ ipc });
      }
    }

    return new ApolloLink(() => {
      return null;
    });
  })();

  const errorLink = createErrorLink();
  const link = ApolloLink.from([errorLink, dataLink]);
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
