import {
  getParityProvider,
  getAccountAddress,
} from '@melonproject/melon.js';
import getNextConfig from 'next/config';
import memoizeOne from 'memoize-one';

const { publicRuntimeConfig: nextConfig } = getNextConfig();

export const defaults = {};

export const resolvers = {
  Mutation: {
    deleteWallet: async (_, __, { loaders }) => {
      await loaders.deleteWallet();
      loaders.setEnvironment({ account: null });
      return {
        accountAddress: null,
        privateKey: null,
        storedWallet: null,
      };
    },
  },
  Query: {
    storedWallet: (_, __, { loaders }) => {
      return loaders.getStoredWallet();
    },
    privateKey: (_, __, { loaders }) => {
      return loaders.getPrivateKey();
    },
    accountAddress: (_, __, { loaders }) => {
      return loaders.accountAddress();
    },
  },
};

let environment;
export const withContext = cache => async operation => {
  if (typeof environment === 'undefined') {
    environment = {
      ...(await getParityProvider(nextConfig.jsonRpcEndpoint)),
      track: nextConfig.track,
    };
  }

  return {
    environment,
    loaders: {
      accountAddress: memoizeOne(() => {
        return getAccountAddress(environment);
      }),
      getPrivateKey: memoizeOne(() => {
        return (environment.account && environment.account.privateKey) || null;
      }),
      getStoredWallet: () => {
        return localStorage.getItem('wallet:melon.fund');
      },
      deleteWallet: async () => {
        return localStorage.removeItem('wallet:melon.fund');
      },
      setEnvironment: values => {
        environment = {
          ...environment,
          ...values,
        };
      },
    },
  };
};
