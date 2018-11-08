// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '~/schema/schema.gql';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import withApollo from 'next-with-apollo';
import { SubscriptionClient } from '~/electron/graphql/client';
import { createErrorLink } from './common';
import getConfig from 'next/config';

// Re-export the various query components so we can add some customization.
export { Subscription, Mutation } from 'react-apollo';
export { Query } from './common';

const createLink = (options, cache) => {
  const client = new SubscriptionClient({
    messenger: global.ipcRenderer,
    channel: 'graphql',
  });

  const ipcLink = new ApolloLink(operation => client.request(operation));
  const errorLink = createErrorLink();
  return ApolloLink.from([errorLink, ipcLink]);
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
