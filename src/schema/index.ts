import { makeExecutableSchema } from 'graphql-tools';
import { publishReplay } from 'rxjs/operators';
import Accounts from 'web3-eth-accounts';
import resolvers from './resolvers';
import createLoaders from './loaders';
import subscribeBlock from './utils/subscribeBlock';
import currentRanking from './utils/currentRanking';
import subscribeSyncing from './utils/subscribeSyncing';
import hasRecentPrice from './utils/hasRecentPrice';
import currentPeers from './utils/currentPeers';
import InsecureDirective from './directives/InsecureDirective';
import addQueryDirectives from './directives/addQueryDirectives';
import * as typeDefs from './schema.gql';

export async function createContext(environment, wallet = null) {
  // The current wallet (in an electron context);
  let currentWallet = wallet;

  const block$ = subscribeBlock(environment).pipe(publishReplay(1));
  const syncing$ = subscribeSyncing(environment).pipe(publishReplay(1));
  const peers$ = currentPeers(environment, block$).pipe(publishReplay(1));
  const recentPrice$ = hasRecentPrice(environment, block$).pipe(
    publishReplay(1),
  );
  const ranking$ = currentRanking(environment, block$).pipe(publishReplay(1));

  const streams = {
    peers$,
    block$,
    ranking$,
    syncing$,
    recentPrice$,
  };

  Object.values(streams).forEach(stream$ => stream$.connect());

  return () => ({
    environment,
    streams,
    loaders: {
      setWallet: value => {
        currentWallet = value;
      },
      getWallet: () => {
        return currentWallet;
      },
      ...createLoaders(environment, streams),
    },
  });
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    insecure: InsecureDirective,
  },
});

const defaultAccount = ({ loaders }) => {
  const wallet = loaders.getWallet();
  return (wallet && wallet.address) || undefined;
};

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
    const account = args[directiveArgs.arg] || defaultAccount(context);
    const newArgs = {
      ...args,
      [directiveArgs.arg]: account,
    };

    return resolve(source, newArgs, context, info);
  },
});

export default schema;
