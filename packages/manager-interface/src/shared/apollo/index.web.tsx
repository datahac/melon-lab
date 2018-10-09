// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '@melonproject/graphql-schema/schema.gql';
import generateMnemonic from '@melonproject/graphql-schema/loaders/wallet/generateMnemonic';
import restoreWallet from '@melonproject/graphql-schema/loaders/wallet/restoreWallet';
import decryptWallet from '@melonproject/graphql-schema/loaders/wallet/decryptWallet';
import signTransaction from '@melonproject/graphql-schema/loaders/transaction/signTransaction';
import signMessage from '@melonproject/graphql-schema/loaders/transaction/signMessage';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import ApolloClient from 'apollo-client';
import { split, from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import withApollo from 'next-with-apollo';
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

  const stateLink = withClientState({
    cache,
    defaults: {
      wallet: null,
    },
    resolvers: {
      Mutation: {
        signMessage: (_, { key, message }, { cache }) => {
          return signMessage(key, message);
        },
        signTransaction: (_, { key, transaction }, { cache }) => {
          return signTransaction(key, transaction);
        },
        generateMnemonic: () => {
          return generateMnemonic();
        },
        decryptWallet: (_, { wallet, password }) => {
          return decryptWallet(wallet, password).then((result) => ({
            ...result,
            __typename: 'Wallet',
          }));
        },
        restoreWallet: (_, { mnemonic, password }) => {
          return restoreWallet(mnemonic, password).then((result) => ({
            ...result,
            __typename: 'Wallet',
          }));
        },
      },
    },
  });

  const httpAndStateLink = from([stateLink, httpLink]);

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
