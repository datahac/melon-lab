require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

const path = require('path');

module.exports = {
  distDir: path.join('..', 'build', 'next'),
  publicRuntimeConfig: ({
    jsonRpcRemote: process.env.JSON_RPC_REMOTE,
    baseTokenDefault: `MLN${process.env.TRACK !== 'live' ? '-T' : ''}`,
    quoteTokenDefault: `WETH${process.env.TRACK !== 'live' ? '-T' : ''}`,
    serverSideWallet: process.env.NODE_ENV === 'development' && !!JSON.parse(process.env.SERVER_SIDE_WALLET || 'false'),
    track: process.env.TRACK,
  }),
};
