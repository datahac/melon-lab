// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '@melonproject/graphql-schema/schema.gql';
import generateMnemonic from '@melonproject/graphql-schema/loaders/wallet/generateMnemonic';
import restoreWallet from '@melonproject/graphql-schema/loaders/wallet/restoreWallet';
import importWallet from '@melonproject/graphql-schema/loaders/wallet/decryptWallet';
import signTransaction from '@melonproject/graphql-schema/loaders/transaction/signTransaction';
import signMessage from '@melonproject/graphql-schema/loaders/transaction/signMessage';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { Query as QueryBase } from 'react-apollo';
import { createErrorLink } from './common';
import withApollo from 'next-with-apollo';
import getConfig from 'next/config';

const { publicRuntimeConfig: config, serverRuntimeConfig: serverConfig } = getConfig();

// We must disable SSR in the electron app. Hence, we re-export
// the query components here so we can override the ssr flag.
export { Subscription, Mutation } from 'react-apollo';
export const Query = ({ errorPolicy, ...props }) => (
  <QueryBase {...props} errorPolicy={errorPolicy || 'all'} />
);

const createLink = (options, cache) => {
  const stateLink = withClientState({
    cache,
    defaults: {
      hasStoredWallet: false,
      defaultAccount: null,
      allAccounts: null,
    },
    resolvers: {
      Mutation: {
        deleteWallet: () => {
          return true;
        },
        signMessage: (_, { message }, { getWallet }) => {
          const wallet = getWallet();
          return signMessage(message);
        },
        signTransaction: (_, { transaction }, { getWallet }) => {
          const wallet = getWallet();
          return signTransaction(transaction);
        },
        generateMnemonic: () => {
          return generateMnemonic();
        },
        exportWallet: (_, { password }, { getWallet }) => {
          const wallet = getWallet();
          return wallet && wallet.encrypt(password) || null;
        },
        importWallet: (_, { wallet, password }, { setWallet }) => {
          return importWallet(wallet, password, (wallet) => {
            setWallet(wallet);
          });
        },
        restoreWallet: (_, { mnemonic, password }, { setWallet }) => {
          return restoreWallet(mnemonic, password, (wallet) => {
            setWallet(wallet);
          });
        },
        loginWallet: () => {
          throw new Error('The in-browser app does not support storing of wallets for security reasons.');
        },
      },
    },
  });

  let activeWallet = null;
  const stateContext = setContext(() => ({
    getWallet: () => activeWallet,
    setWallet: (wallet) => {
      activeWallet = wallet;
    },
  }));

  const stateLinkWithContext = ApolloLink.from([stateContext, stateLink]);

  const dataLink = new WebSocketLink({
    uri: serverConfig.graphqlLocalWs || config.graphqlRemoteWs,
    options: {
      reconnect: true,
    },
  });

  const errorLink = createErrorLink();
  return ApolloLink.from([errorLink, stateLinkWithContext, dataLink]);
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
