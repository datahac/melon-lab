require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

import schema, { createContext } from '@melonproject/graphql-schema';
import * as express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';

const development = process.env.NODE_ENV === 'development';
const playground = JSON.parse(process.env.GRAPHQL_PLAYGROUND || 'false');
const tracing = JSON.parse(process.env.GRAPHQL_DEBUG || 'false');
const debug = JSON.parse(process.env.GRAPHQL_TRACING || 'false');

async function start(port: number) {
  const app = express();
  const server = createServer(app);
  const track = process.env.TRACK || 'kovan-demo';
  const endpoint = process.env.JSON_RPC_LOCAL || process.env.JSON_RPC_REMOTE;
  const context = await createContext(track, endpoint);

  const apollo = new ApolloServer({
    schema,
    context: await context(),
    tracing: development || tracing,
    debug: development || debug,
    introspection: development || playground,
    playground: development || playground,
    subscriptions: {
      path: '/',
    },
  });

  apollo.applyMiddleware({
    app,
    path: '/',
    cors: true,
    bodyParserConfig: true,
    disableHealthCheck: true,
  });

  apollo.installSubscriptionHandlers(server);

  server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on http://localhost:${port}`);
  });
}

start(3030);
