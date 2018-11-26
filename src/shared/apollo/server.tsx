import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { SchemaLink } from 'apollo-link-schema';
import { createErrorLink, createCache } from './common';
import withApollo from 'next-with-apollo';
import { Query as QueryBase } from 'react-apollo';
import { withClientState } from 'apollo-link-state';

export { Subscription } from 'react-apollo';
export { Mutation } from 'react-apollo';

// We must disable SSR in the electron app. Hence, we re-export
// the query components here so we can override the ssr flag.
export const Query = ({ errorPolicy, ...props }) => (
  <QueryBase {...props} errorPolicy={errorPolicy || 'all'} />
);

export const createStateLink = cache => {
  const defaults = {
    hasStoredWallet: false,
    defaultAccount: null,
    allAccounts: null,
  };

  // We only need the local overrides for the schema within the browser.
  // The server won't ever run these since the affected fields are generally
  // mutations or don't pose any security relevant thread. Even if they did,
  // they would be protected through our directives in the schema.
  return withClientState({ cache, defaults, resolvers: {} });
};

// TODO: This singleton is an ugly hack. Fix it.
let dataLinkSingleton;
export const createDataLink = options => {
  if (typeof dataLinkSingleton === 'undefined') {
    dataLinkSingleton = new SchemaLink({
      schema: options.ctx.res.schema,
      context: options.ctx.res.context,
    });
  }

  return dataLinkSingleton;
};

export const createClient = options => {
  const cache = createCache();
  const errorLink = createErrorLink();
  const dataLink = createDataLink(options);
  const stateLink = createStateLink(cache);

  const link = ApolloLink.from([errorLink, stateLink, dataLink]);
  const client = new ApolloClient({
    ssrMode: true,
    link,
    cache,
  });

  return client;
};

export default withApollo(options => {
  return createClient(options);
});
