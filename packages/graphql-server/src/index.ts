require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

import schema, { createContext } from '@melonproject/graphql-schema';
import * as express from 'express';
import { createServer } from 'http';
import { ApolloServer, PubSub } from 'apollo-server-express';

async function start(port: number) {
  const app = express();
  const server = createServer(app);
  
  const pubsub = new PubSub();
  const track = process.env.TRACK || 'kovan-demo';
  const endpoint = process.env.JSON_RPC_ENDPOINT;
  const context = await createContext(track, endpoint, pubsub);

  const apollo = new ApolloServer({
    schema,
    context: await context(),
    tracing: process.env.NODE_ENV === 'development',
    debug: process.env.NODE_ENV === 'development',
    playground: process.env.NODE_ENV === 'development',
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
