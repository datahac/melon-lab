require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

import schema, { createContext } from '@melonproject/graphql-schema';
import { getConfig, getParityProvider } from '@melonproject/melon.js';
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
  const environment = {
    ...(await getParityProvider(process.env.JSON_RPC_ENDPOINT)),
    track,
  };

  const config = await getConfig(environment);
  const context = createContext(environment, config, pubsub);

  const json = bodyParser.json();
  const urlencoded = bodyParser.urlencoded({ extended: true });

  const gql = graphqlExpress({
    schema,
    context,
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
      onOperation: (message, params, socket) => ({
        ...params,
        context: context(),
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
