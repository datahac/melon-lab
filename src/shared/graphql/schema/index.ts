import { makeExecutableSchema } from 'graphql-tools';
import Accounts from 'web3-eth-accounts';
import addQueryDirectives from './directives/addQueryDirectives';
import resolvers from './resolvers';
import * as typeDefs from './schema.gql';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  inheritResolversFromInterfaces: true,
});

addQueryDirectives(schema, {
  sign: async (resolve, source, args, context, info, directiveArgs) => {
    if (typeof args[directiveArgs.target] !== 'undefined') {
      // The transaction is already signed.
      return resolve(source, args, context, info);
    }

    const { environment, loaders } = context;
    const wallet = loaders.getWallet();
    const accounts = new Accounts(environment.eth.currentProvider);
    const unsigned = args[directiveArgs.source];
    const signed = await accounts.signTransaction(
      unsigned,
      wallet && wallet.privateKey,
    );

    const newArgs = {
      ...args,
      [directiveArgs.target]: signed,
    };

    return resolve(source, newArgs, context, info);
  },
  account: (resolve, source, args, context, info, directiveArgs) => {
    const account =
      args[directiveArgs.arg] ||
      (() => {
        const wallet = context.loaders.getWallet();
        return (wallet && wallet.address) || undefined;
      })();

    const newArgs = {
      ...args,
      [directiveArgs.arg]: account,
    };

    return resolve(source, newArgs, context, info);
  },
});
