import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { SchemaLink } from 'apollo-link-schema';
import { Query as QueryBase } from 'react-apollo';
export { Subscription } from 'react-apollo';
export { Mutation } from 'react-apollo';
import withApollo from 'next-with-apollo';
import { createErrorLink, createCache } from './common';
import { createIdentityLink } from './identity';

// We must disable SSR in the electron app. Hence, we re-export
// the query components here so we can override the ssr flag.
export const Query = ({ errorPolicy, ...props }) => (
  <QueryBase {...props} errorPolicy={errorPolicy || 'all'} />
);

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
  const identityLink = createIdentityLink(cache);

  const link = ApolloLink.from([errorLink, identityLink, dataLink]);
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
