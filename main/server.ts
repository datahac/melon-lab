import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql/schema';
import { createContext } from './graphql/context';
import { getEnvironment, getWallet } from './graphql/environment';

(async () => {
  const logger =
    process.env.NODE_ENV === 'production'
      ? undefined
      : require('@melonproject/protocol/lib/tests/utils/testLogger').testLogger;

  const environment = await getEnvironment(logger);
  const wallet = await getWallet();
  const context = await createContext(environment, wallet);
  const apollo = new ApolloServer({
    schema,
    context,
    tracing: true,
    debug: true,
    introspection: true,
    playground: true,
    subscriptions: {
      path: '/',
    },
  });

  // Build the server.
  const app = express();
  const server = createServer(app);

  // Register the graphql routes.
  apollo.applyMiddleware({
    app,
    path: '/',
    cors: true,
    bodyParserConfig: true,
    disableHealthCheck: true,
  });

  apollo.installSubscriptionHandlers(server);

  server.listen(3030, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on http://localhost:3030`);
  });
})();
