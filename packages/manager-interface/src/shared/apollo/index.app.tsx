// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '@melonproject/graphql-schema/schema.gql';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import ApolloClient from 'apollo-client';
import { ApolloLink, from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import withApollo from 'next-with-apollo';
import { defaults, resolvers, withContext } from './state';
import { SubscriptionClient } from '~/electron/graphql/client';
import { Query as QueryBase } from 'react-apollo';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

// We must disable SSR in the electron app. Hence, we re-export
// the query components here so we can override the ssr flag.
export { Subscription, Mutation } from 'react-apollo';
export const Query = ({ ssr, ...props }) => (
  <QueryBase {...props} ssr={config.isElectron ? false : ssr} />
);

const client = new SubscriptionClient({
  messenger: global.ipcRenderer,
  channel: 'graphql',
});

const createLink = (options, cache) => {
  const ipcLink = new ApolloLink(operation => client.request(operation));

  // TODO: Remove state link for electron app.
  const clientContext = setContext(withContext(cache));
  const stateLink = withClientState({
    cache,
    resolvers,
    defaults,
  });

  const stateLinkWithContext = from([clientContext, stateLink]);
  const ipcAndStateLink = from([stateLinkWithContext, ipcLink]);

  return ipcAndStateLink;
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
