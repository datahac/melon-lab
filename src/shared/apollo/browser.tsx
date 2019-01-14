import { Query as QueryBase } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
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

export const createDataLink = () => {
  const port = window.location.port ? `:${window.location.port}` : '';
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const uri = `${protocol}//${hostname}${port}/api`;

  const dataLink = new WebSocketLink({
    uri: uri.replace('http', 'ws'),
    options: {
      reconnect: true,
    },
  });

  return dataLink;
};

export const createClient = options => {
  const cache = createCache();
  const errorLink = createErrorLink();
  const dataLink = createDataLink();
  const identityLink = createIdentityLink(cache);

  const link = ApolloLink.from([errorLink, identityLink, dataLink]);
  const client = new ApolloClient({
    link,
    cache,
  });

  return client;
};

export default withApollo(options => {
  return createClient(options);
});
