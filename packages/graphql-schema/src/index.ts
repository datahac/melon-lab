import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import createLoaders from './loaders';
import pollBlock from './utils/pollBlock';
import pollRanking from './utils/pollRanking';
import pollSynced from './utils/pollSynced';
import pollPeers from './utils/pollPeers';
import pollPriceFeed from './utils/pollPriceFeed';
import getProviderType from './utils/getProviderType';
import getEnvironment from './utils/getEnvironment';
import getConfig from './utils/getConfig';
import getNetwork from './utils/getNetwork';
import timeoutAfter from './utils/timeoutAfter';
import * as typeDefs from './schema.gql';

export async function createContext(track, endpoint, pubsub) {
  const environment$ = getEnvironment(track, endpoint).retryWhen((errors) => errors.delay(1000));
  const network$ = environment$.map((environment) => environment && getNetwork(environment));
  const provider$ = environment$.map((environment) => environment && getProviderType(environment));
  const config$ = environment$.switchMap((environment) => environment && getConfig(environment));
  const block$ = environment$.switchMap((environment) => environment && pollBlock(environment));
  const ranking$ = environment$.switchMap((environment) => environment && pollRanking(environment));
  const synced$ = environment$.switchMap((environment) => environment && pollSynced(environment));
  const peers$ = environment$.switchMap((environment) => environment && pollPeers(environment));
  const priceFeed$ = environment$.switchMap((environment) => environment && pollPriceFeed(environment));

  const timeout = timeoutAfter(5000, null);
  const streams = {
    environment$: environment$.race(timeout).shareReplay(1),
    block$: block$.race(timeout).shareReplay(1),
    synced$: synced$.race(timeout).shareReplay(1),
    config$: config$.race(timeout).shareReplay(1),
    provider$: provider$.race(timeout).shareReplay(1),
    network$: network$.race(timeout).shareReplay(1),
    ranking$: ranking$.race(timeout).shareReplay(1),
    peers$: peers$.race(timeout).shareReplay(1),
    priceFeed$: priceFeed$.race(timeout).shareReplay(1),
  };

  return async () => {
    const loaders = await createLoaders(streams);

    return {
      pubsub,
      loaders,
      streams,
    };
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
}) as GraphQLSchema;
