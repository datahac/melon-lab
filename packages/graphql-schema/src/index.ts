import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import createLoaders from './loaders';
import pollBlock from './utils/pollBlock';
import pollRanking from './utils/pollRanking';
import getProviderType from './utils/getProviderType';
import getNetwork from './utils/getNetwork';
import * as typeDefs from './schema.gql';

export function createContext(environment, config, pubsub) {
  const block$ = pollBlock(environment);
  const currentBlock$ = block$.shareReplay(1);
  const ranking$ = pollRanking(environment);
  const currentRanking$ = ranking$.shareReplay(1);

  const network = getNetwork(environment);
  const provider = getProviderType(environment);

  return () => {
    const context = {
      network,
      provider,
      environment,
      config,
      pubsub,
      block$,
      ranking$,
      currentBlock$,
      currentRanking$,
    };

    return {
      ...context,
      loaders: createLoaders(context),
    };
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
}) as GraphQLSchema;
