import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { SchemaLink } from 'apollo-link-schema';
import { createErrorLink, createCache } from './common';
import withApollo from 'next-with-apollo';

// Re-export the various query components so we can add some defaults.
export { Subscription, Mutation } from 'react-apollo';
export { Query } from './common';

// TODO: This singleton is an ugly hack. Fix it.
let dataLinkSingleton;
export const createDataLink = (options) => {
  if (typeof dataLinkSingleton === 'undefined') {
    dataLinkSingleton = new SchemaLink({
      schema: options.ctx.res.schema,
      context: options.ctx.res.context,
    });
  }

  return dataLinkSingleton;
}

export const createClient = options => {
  const cache = createCache();
  const errorLink = createErrorLink();
  const dataLink = createDataLink(options);

  const link = ApolloLink.from([errorLink, dataLink]);
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
