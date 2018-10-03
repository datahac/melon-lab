require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

const path = require('path');

const isElectron = !!JSON.parse(process.env.ELECTRON || 'false');

module.exports = {
  distDir: path.join('..', 'build'),
  publicRuntimeConfig: Object.assign({
    isElectron,
  }, isElectron ? {} : {
    graphqlRemoteWs: process.env.GRAPHQL_REMOTE_WS,
    graphqlRemoteHttp: process.env.GRAPHQL_REMOTE_HTTP,
  }),
  serverRuntimeConfig: Object.assign({
    isElectron,
  }, isElectron ? {} : {
    graphqlLocalWs: process.env.GRAPHQL_LOCAL_WS,
    graphqlLocalHttp: process.env.GRAPHQL_LOCAL_HTTP,
  }),
};
