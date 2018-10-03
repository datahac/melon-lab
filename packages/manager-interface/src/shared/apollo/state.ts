export const defaults = {};

export const resolvers = {
  Mutation: {
    deleteWallet: async (_, __, { loaders }) => {
      await loaders.deleteWallet();

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

export const withContext = cache => async operation => {
  return {
    loaders: {
      accountAddress: () => {
        return null;
      },
      getPrivateKey: () => {
        return null;
      },
      getStoredWallet: () => {
        return localStorage.getItem('wallet:melon.fund');
      },
      deleteWallet: async () => {
        return localStorage.removeItem('wallet:melon.fund');
      },
    },
  };
};
