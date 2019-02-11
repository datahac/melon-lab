import * as R from 'ramda';
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
  // schemaDirectives: {
  //   account: AccountDirective,
  //   sign: SignDirective,
  // },
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

const signWithHardwareWallet = async (environment, wallet, unsigned) => {
  const signed = await environment.eth.signTransaction(
    unsigned,
    wallet.address,
  );
  return signed;
};

addQueryDirectives(schema, {
  sign: async (resolve, source, args, context, info, directiveArgs) => {
    if (typeof args[directiveArgs.target] !== 'undefined') {
      // The transaction is already signed.
      return resolve(source, args, context, info);
    }

    const { environment, loaders } = context;
    const wallet = loaders.getWallet();
    const walletType = loaders.getWalletType();

    const unsigned = R.pick(
      ['data', 'from', 'gas', 'gasPrice', 'to', 'value'],
      args[directiveArgs.source],
    );

    const signed =
      walletType === WalletTypes.HARDWARE
        ? await signWithHardwareWallet(environment, wallet, unsigned)
        : await signWithPrivateKey(environment, wallet, unsigned);

    console.log(signed);

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
