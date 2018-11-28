import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import createLoaders from './loaders';
import subscribeBlock from './utils/subscribeBlock';
import pollRanking from './utils/pollRanking';
import subscribeSyncing from './utils/subscribeSyncing';
import pollPriceFeed from './utils/pollPriceFeed';
import pollNetwork from './utils/pollNetwork';
import getEnvironment from './utils/getEnvironment';
import currentDeployment from './utils/currentDeployment';
import currentPeers from './utils/currentPeers';
import InsecureDirective from './directives/InsecureDirective';
import * as typeDefs from './schema.gql';
import { publishReplay } from 'rxjs/operators';

export async function createContext(track, endpoint) {
  // The current wallet (in an electron context);
  let currentWallet;

  const environment = getEnvironment(track, endpoint);

  const network$ = pollNetwork(environment).pipe(publishReplay(1));
  const block$ = subscribeBlock(environment).pipe(publishReplay(1));
  const ranking$ = pollRanking(environment).pipe(publishReplay(1));
  const syncing$ = subscribeSyncing(environment).pipe(publishReplay(1));
  const priceFeed$ = pollPriceFeed(environment).pipe(publishReplay(1));
  const deployment$ = currentDeployment(environment, network$).pipe(
    publishReplay(1),
  );
  const peers$ = currentPeers(environment, block$).pipe(publishReplay(1));

  const streams = {
    network$,
    peers$,
    block$,
    ranking$,
    syncing$,
    priceFeed$,
    deployment$,
  };

  Object.values(streams).forEach(stream$ => stream$.connect());

  return () => ({
    environment,
    streams,
    loaders: {
      setWallet: wallet => {
        currentWallet = wallet;
      },
      getWallet: () => {
        return currentWallet;
      },
      ...createLoaders(environment, streams),
    },
  });
}

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    insecure: InsecureDirective,
  },
}) as GraphQLSchema;
