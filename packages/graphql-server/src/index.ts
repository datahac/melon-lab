require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

import schema, { createContext } from '@melonproject/graphql-schema';
import { graphqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

async function start(port: number) {
  const app = express();

  const pubsub = new PubSub();
  const track = process.env.TRACK || 'kovan-demo';
  const endpoint = process.env.JSON_RPC_ENDPOINT;
  const context = await createContext(track, endpoint, pubsub);

  const json = bodyParser.json();
  const urlencoded = bodyParser.urlencoded({ extended: true });

  const gql = graphqlExpress(async (req) => {
    return {
      schema,
      context: await context(),
    };
  });

  app.use(cors())
  app.use('/', cors(), urlencoded, json, gql);

  const server = createServer(app);

  // tslint:disable-next-line:no-unused-expression
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onOperation: async (message, params, socket) => ({
        ...params,
        context: await context(),
      }),
    },
    {
      server,
      path: '/',
    },
  );

  server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on http://localhost:${port}`);
  });
}

start(3030);
