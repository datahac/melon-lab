const envPath = require('find-up').sync(['.env', '.env.defaults']);

require('dotenv').config({
  path: envPath,
});

const express = require('express');
const next = require('next');
const compression = require('compression');
const spdy = require('spdy');
const fs = require('fs');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' });
const handle = app.getRequestHandler();

// Create a HTTP v2 capable server in production.
const createServer = (server) => {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.CERTIFICATE_KEY_FILE && process.env.CERTIFICATE_CRT_FILE) {
      const options = {
        key: fs.readFileSync(process.env.CERTIFICATE_KEY_FILE),
        cert: fs.readFileSync(process.env.CERTIFICATE_CRT_FILE),
      };

      console.log('Starting production server in HTTP v2 mode.');

      return spdy.createServer(options, server);
    }
  }

  return server;
};

app.prepare().then(() => {
  const server = express();

  server.use(compression());

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  createServer(server).listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`> Ready on http://localhost:${port}`)
  });
});
