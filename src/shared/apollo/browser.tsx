import generateMnemonic from '~/schema/loaders/wallet/generateMnemonic';
import restoreWallet from '~/schema/loaders/wallet/restoreWallet';
import importWallet from '~/schema/loaders/wallet/decryptWallet';
import { Query as QueryBase } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { createErrorLink, createCache } from './common';
import withApollo from 'next-with-apollo';

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

  const stateLink = withClientState({
    cache,
    defaults,
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
          return (wallet && wallet.encrypt(password)) || null;
        },
        importWallet: (_, { wallet, password }, { setWallet }) => {
          return importWallet(wallet, password, wallet => {
            setWallet(wallet);
          });
        },
        restoreWallet: (_, { mnemonic, password }, { setWallet }) => {
          return restoreWallet(mnemonic, password, wallet => {
            setWallet(wallet);
          });
        },
        loginWallet: () => {
          throw new Error(
            'The in-browser app does not support storing of wallets for security reasons.',
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
      getWallet: () => activeWallet,
      setWallet: wallet => {
        activeWallet = wallet;
      },
    };

    return contextSingleton;
  });

  return ApolloLink.from([stateContext, stateLink]);
};

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
  const stateLink = createStateLink(cache);
  const errorLink = createErrorLink();
  const dataLink = createDataLink();

  const link = ApolloLink.from([errorLink, stateLink, dataLink]);
  const client = new ApolloClient({
    link,
    cache,
  });

  return client;
};

export default withApollo(options => {
  return createClient(options);
});
