// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '@melonproject/graphql-schema/schema.gql';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import ApolloClient from 'apollo-client';
import { split, from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import withApollo from 'next-with-apollo';
import { defaults, resolvers, withContext } from './state';
import getConfig from 'next/config';

const { publicRuntimeConfig: config, serverRuntimeConfig: serverConfig } = getConfig();

// We must disable SSR in the electron app. Hence, we re-export
// the query components here so we can override the ssr flag.
export { Query, Subscription, Mutation } from 'react-apollo';

const isSubscription = ({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
};

const createLink = (options, cache) => {
  const httpLink = new HttpLink({
    uri: serverConfig.graphqlLocalHttp || config.graphqlRemoteHttp,
    headers: options.headers,
  });

  const clientContext = setContext(withContext(cache));
  const stateLink = withClientState({
    cache,
    resolvers,
    defaults,
  });

  const stateLinkWithContext = from([clientContext, stateLink]);
  const httpAndStateLink = from([stateLinkWithContext, httpLink]);

  // Do not use the websocket link on the server.
  if (!process.browser) {
    return httpAndStateLink;
  }

  const wsLink = new WebSocketLink({
    uri: serverConfig.graphqlLocalWs || config.graphqlRemoteWs,
    options: {
      reconnect: true,
    },
  });

  return split(isSubscription, wsLink, httpAndStateLink);
};

export const createClient = options => {
  const cache = new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: introspection,
    }),
  });

  const link = createLink(options, cache);
  const client = new ApolloClient({
    ssrMode: !process.browser,
    link,
    cache,
  });

  return client;
};

export default withApollo(options => {
  return createClient(options);
});
