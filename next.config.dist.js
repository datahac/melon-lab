require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

const path = require('path');

const isElectron = !!JSON.parse(process.env.ELECTRON || 'false');

module.exports = {
  distDir: path.join('..', 'build'),
  publicRuntimeConfig: ({
    graphqlRemoteWs: process.env.GRAPHQL_REMOTE_WS,
    graphqlRemoteHttp: process.env.GRAPHQL_REMOTE_HTTP,
    jsonRpcRemote: process.env.JSON_RPC_REMOTE,
    baseTokenDefault: `MLN${process.env.TRACK !== 'live' ? '-T' : ''}`,
    quoteTokenDefault: `WETH${process.env.TRACK !== 'live' ? '-T' : ''}`,
    track: process.env.TRACK,
  }),
  serverRuntimeConfig: isElectron ? {} : ({
    graphqlLocalWs: process.env.GRAPHQL_LOCAL_WS,
    graphqlLocalHttp: process.env.GRAPHQL_LOCAL_HTTP,
    jsonRpcLocal: process.env.JSON_RPC_LOCAL,
  }),
};
