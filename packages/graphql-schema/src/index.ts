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
import InsecureDirective from './directives/InsecureDirective';
import * as typeDefs from './schema.gql';
import { publishReplay, map, switchMap } from 'rxjs/operators';

export async function createContext(track, endpoint) {
  const environment$ = getEnvironment(track, endpoint);

  const factory = {
    environment$: environment$ => environment$,
    network$: environment$ => environment$.pipe(map(getNetwork)),
    provider$: environment$ => environment$.pipe(map(getProviderType)),
    config$: environment$ => environment$.pipe(switchMap(getConfig)),
    block$: environment$ => environment$.pipe(switchMap(pollBlock)),
    ranking$: environment$ => environment$.pipe(switchMap(pollRanking)),
    synced$: environment$ => environment$.pipe(switchMap(pollSynced)),
    peers$: environment$ => environment$.pipe(switchMap(pollPeers)),
    priceFeed$: environment$ => environment$.pipe(switchMap(pollPriceFeed)),
  };

  const streams = Object.keys(factory).reduce((acc, key) => {
    const stream$ = factory[key](environment$).pipe(publishReplay(1));
    stream$.connect();

    return {
      ...acc,
      [key]: stream$,
    };
  }, {})

  Object.values(streams).forEach(stream$ => stream$);

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
