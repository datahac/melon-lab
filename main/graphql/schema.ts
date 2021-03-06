import * as R from 'ramda';
import * as Tm from '@melonproject/token-math';
import { makeExecutableSchema } from 'graphql-tools';
import Accounts from 'web3-eth-accounts';
import addQueryDirectives from './directives/addQueryDirectives';
// import { SignDirective } from './directives/SignDirective';
// import { AccountDirective } from './directives/AccountDirective';
import resolvers from './resolvers';
import * as typeDefs from './schema.gql';
import { WalletTypes } from './context';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  inheritResolversFromInterfaces: true,
});

const signWithPrivateKey = async (environment, wallet, unsigned) => {
  if (!wallet || !wallet.privateKey) throw new Error('No private key found');

  const accounts = new Accounts(environment.eth.currentProvider);
  const signed = await accounts.signTransaction(
    unsigned,
    wallet && wallet.privateKey,
  );

  return signed;
};

addQueryDirectives(schema, {
  authenticated: (resolve, source, args, context, info) => {
    const { loaders } = context;
    const wallet = loaders.getWallet();
    if (!wallet) {
      return null;
    }

    return resolve(source, args, context, info);
  },
  sign: async (resolve, source, args, context, info, directiveArgs) => {
    if (typeof args[directiveArgs.target] !== 'undefined') {
      // The transaction is already signed.
      return resolve(source, args, context, info);
    }

    const { loaders } = context;
    const environment = await loaders.environment();
    const wallet = loaders.getWallet();
    const walletType = loaders.getWalletType();

    const unsigned = R.pick(
      ['data', 'from', 'gas', 'gasPrice', 'to', 'value'],
      args[directiveArgs.source],
    );

    // Convert gasPrice in GWEI to wei
    unsigned.gasPrice = Tm.multiply(unsigned.gasPrice, 1000000000).toString();

    // If the endpoint (aka Hardware wallet) is capable of signing itself, we
    // skip signing here.
    const signedOrNot =
      walletType === WalletTypes.HARDWARE
        ? unsigned
        : await signWithPrivateKey(environment, wallet, unsigned);

    const newArgs = {
      ...args,
      [directiveArgs.target]: signedOrNot,
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
