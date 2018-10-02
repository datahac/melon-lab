require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

const path = require('path');

module.exports = {
  distDir: path.join('..', 'build'),
  publicRuntimeConfig: {
    graphqlRemoteWs: process.env.GRAPHQL_REMOTE_WS,
    graphqlRemoteHttp: process.env.GRAPHQL_REMOTE_HTTP,
    jsonRpcEndpoint: process.env.JSON_RPC_ENDPOINT,
    track: process.env.TRACK,
  },
};
