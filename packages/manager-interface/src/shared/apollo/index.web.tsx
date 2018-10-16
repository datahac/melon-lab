// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '@melonproject/graphql-schema/schema.gql';
import generateMnemonic from '@melonproject/graphql-schema/loaders/wallet/generateMnemonic';
import restoreWallet from '@melonproject/graphql-schema/loaders/wallet/restoreWallet';
import importWallet from '@melonproject/graphql-schema/loaders/wallet/decryptWallet';
import prepareSetupFund from '@melonproject/graphql-schema/loaders/transaction/prepareSetupFund';
import executeSetupFund from '@melonproject/graphql-schema/loaders/transaction/executeSetupFund';
import { getParityProvider, getConfig } from '@melonproject/melon.js';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { Query as QueryBase } from 'react-apollo';
import { createErrorLink } from './common';
import withApollo from 'next-with-apollo';
import { default as getNextConfig } from 'next/config';

const { publicRuntimeConfig: config, serverRuntimeConfig: serverConfig } = getNextConfig();

// We must disable SSR in the electron app. Hence, we re-export
// the query components here so we can override the ssr flag.
export { Subscription, Mutation } from 'react-apollo';
export const Query = ({ errorPolicy, ...props }) => (
  <QueryBase {...props} errorPolicy={errorPolicy || 'all'} />
);

const createStateLink = (cache) => {
  // We only need the local overrides for the schema within the browser.
  // The server won't ever run these since the affected fields are generally
  // mutations or don't pose any security relevant thread. Even if they did,
  // they would be protected through our directives in the schema.
  if (!process.browser) {
    return withClientState({ cache });
  }

  const stateLink = withClientState({
    cache,
    defaults: {
      hasStoredWallet: false,
      defaultAccount: null,
      allAccounts: null,
    },
    resolvers: {
      Mutation: {
        generateMnemonic: () => {
          return generateMnemonic();
        },
        deleteWallet: () => {
          return true;
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
        prepareSetupFund: async (_, { name }, { environment, getWallet }) => {
          const wallet = getWallet();
          const account = wallet && wallet.address;
          const config = await getConfig(environment);

          // TODO: Add signature.
          const signature = null;
  
          return prepareSetupFund(
            environment,
            config,
            name,
            account,
            signature,
          );
        },
        executeSetupFund: async (_, { transaction }, { environment }) => {
          const config = await getConfig(environment);

          return executeSetupFund(
            environment,
            config,
            transaction,
          );
        },
      },
    },
  });

  let contextSingleton;
  const stateContext = setContext(async () => {
    if (contextSingleton) {
      return contextSingleton;
    }

    let activeWallet;

    contextSingleton = {
      environment: {
        ...(await getParityProvider(config.jsonRpcRemote)),
        track: config.track,
      },
      getWallet: () => activeWallet,
      setWallet: (wallet) => {
        activeWallet = wallet;
      },
    };

    return contextSingleton;
  });

  return ApolloLink.from([stateContext, stateLink]);
};

export const createClient = options => {
  const cache = new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: introspection,
    }),
  });

  const stateLink = createStateLink(cache);
  const errorLink = createErrorLink();
  const dataLink = new WebSocketLink({
    uri: process.browser ? config.graphqlRemoteWs : serverConfig.graphqlLocalWs,
    options: {
      reconnect: true,
    },
  });

  const link = ApolloLink.from([errorLink, stateLink, dataLink]);
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
