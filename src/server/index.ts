require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

import schema, { createContext } from '~/schema';
import next from 'next';
import compression from 'compression';
import * as express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';

(async () => {
  const development = process.env.NODE_ENV === 'development';
  const playground = JSON.parse(process.env.GRAPHQL_PLAYGROUND || 'false');
  const tracing = JSON.parse(process.env.GRAPHQL_DEBUG || 'false');
  const debug = JSON.parse(process.env.GRAPHQL_TRACING || 'false');
  const port = parseInt(process.env.PORT, 10) || 3000;
  const track = process.env.TRACK || 'kovan-demo';
  const endpoint = process.env.JSON_RPC_LOCAL || process.env.JSON_RPC_REMOTE;

  // // Bootstrap the next.js environment.
  const renderer = next({ dev: development, dir: './src' });
  await renderer.prepare();

  // Bootstrap the graphql server.
  const context = await createContext(track, endpoint);
  const apollo = new ApolloServer({
    schema,
    context,
    tracing: development || tracing,
    debug: development || debug,
    introspection: development || playground,
    playground: development || playground,
    subscriptions: {
      path: '/api',
    },
  });

  // Build the server.
  const handle = renderer.getRequestHandler();
  const app = express();
  const server = createServer(app);

  // Register the next.js routes.
  app.use(compression());

  app.get('*', (req, res) => {
    return handle(req, res);
  });

  // Register the graphql routes.
  apollo.applyMiddleware({
    app,
    path: '/api',
    cors: true,
    bodyParserConfig: true,
    disableHealthCheck: true,
  });

  apollo.installSubscriptionHandlers(server);

  server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
