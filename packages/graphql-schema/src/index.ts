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

export async function createContext(track, endpoint) {
  const environment$ = getEnvironment(track, endpoint).retryWhen(errors =>
    errors.delay(1000),
  );

  const derive = fn => environment => environment && fn(environment);
  const timeout = timeoutAfter(5000, null);
  const factory = {
    environment$: environment$ => environment$,
    network$: environment$ => environment$.map(derive(getNetwork)),
    provider$: environment$ => environment$.map(derive(getProviderType)),
    config$: environment$ => environment$.switchMap(derive(getConfig)),
    block$: environment$ => environment$.switchMap(derive(pollBlock)),
    ranking$: environment$ => environment$.switchMap(derive(pollRanking)),
    synced$: environment$ => environment$.switchMap(derive(pollSynced)),
    peers$: environment$ => environment$.switchMap(derive(pollPeers)),
    priceFeed$: environment$ => environment$.switchMap(derive(pollPriceFeed)),
  };

  const streams = Object.keys(factory).reduce((acc, key) => {
    const stream$ = factory[key](environment$)
      .race(timeout)
      .publishReplay(1);

    return {
      ...acc,
      [key]: stream$,
    };
  }, {});

  Object.values(streams).forEach(stream$ => stream$.connect());

  return async () => {
    const loaders = await createLoaders(streams);

    return {
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
