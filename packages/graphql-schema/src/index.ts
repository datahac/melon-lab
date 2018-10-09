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
import InsecureDirective from './directives/InsecureDirective';
import * as typeDefs from './schema.gql';

export async function createContext(track, endpoint, pubsub) {
  const environment$ = getEnvironment(track, endpoint).retryWhen(errors =>
    errors.delay(1000),
  );

  const timeout = timeoutAfter(5000, null);
  const factory = {
    network$: environment => environment && getNetwork(environment),
    provider$: environment => environment && getProviderType(environment),
    config$: environment => environment && getConfig(environment),
    block$: environment => environment && pollBlock(environment),
    ranking$: environment => environment && pollRanking(environment),
    synced$: environment => environment && pollSynced(environment),
    peers$: environment => environment && pollPeers(environment),
    priceFeed$: environment => environment && pollPriceFeed(environment),
  };

  const streams = Object.keys(factory).reduce(
    (acc, key) => {
      const stream$ = environment$
        .switchMap(factory[key])
        .race(timeout)
        .publishReplay(1);

      return {
        ...acc,
        [key]: stream$,
      };
    },
    {
      environment$: environment$.race(timeout).publishReplay(1),
    },
  );

  Object.values(streams).forEach(stream$ => stream$.connect());

  return async () => {
    const loaders = await createLoaders(streams);

    return {
      pubsub,
      loaders,
      streams,
    };
  };
}

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    insecure: InsecureDirective,
  },
}) as GraphQLSchema;
