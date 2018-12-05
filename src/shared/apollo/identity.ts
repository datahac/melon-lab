import {
  ApolloLink,
  Observable,
  Operation,
  NextLink,
  FetchResult,
} from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { hasDirectives } from 'apollo-utilities';
import generateMnemonic from '~/schema/loaders/wallet/generateMnemonic';
import restoreWallet from '~/schema/loaders/wallet/restoreWallet';
import importWallet from '~/schema/loaders/wallet/decryptWallet';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const resolvers = {
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
  },
};

const addIdentity = operation => {
  // TODO: Process the query.
  return operation;
};

export const createIdentityLink = cache => {
  const identityDecorator = new class IdentityLink extends ApolloLink {
    public request(
      operation: Operation,
      forward: NextLink,
    ): Observable<FetchResult> {
      if (!hasDirectives(['sign', 'from'], operation.query)) {
        return forward(operation);
      }

      return forward(addIdentity(operation));
    }
  }();

  let activeWallet;
  const identityContext = {
    getWallet: () => activeWallet,
    setWallet: wallet => {
      activeWallet = wallet;
    },
  };

  const links = [setContext(() => identityContext), identityDecorator];

  // If in local development and the server-side wallet is enabled,
  // don't add the client state apollo link. This will cause the control
  // of thee wallet / login state to be handed off to the server where
  // it will also be persisted within the graphql server.
  if (!publicRuntimeConfig.serverSideWallet) {
    const defaults = {
      hasStoredWallet: false,
      defaultAccount: null,
      allAccounts: null,
    };

    const resolverOverride = withClientState({
      cache,
      defaults,
      resolvers,
    });

    links.push(resolverOverride);
  }

  return ApolloLink.from(links);
};
