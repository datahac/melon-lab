require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

const path = require('path');
const R = require('ramda');
const webpack = require('webpack');
const withTypeScript = require('@zeit/next-typescript');
const withQueryFiles = require('@melonproject/manager-interface/config/withQueryFiles');
const withLinkedDependencies = require('@melonproject/manager-interface/config/withLinkedDependencies');
const withComposedConfig = R.compose(
  withLinkedDependencies,
  withQueryFiles,
  withTypeScript,
);

const managerPkg = require('@melonproject/manager-interface/package.json');
const melonJsPkg = require('@melonproject/melon.js/package.json');
const smartContractsPkg = require('@melonproject/smart-contracts/package.json');

const managerComponents = path.resolve(path.dirname(require.resolve('@melonproject/manager-components/package.json')));
const managerInterface = path.resolve(path.dirname(require.resolve('@melonproject/manager-interface/package.json')));

const isElectron = !!JSON.parse(process.env.ELECTRON || 'false');

module.exports = withComposedConfig({
  linkedDependencies: [
    ['@melonproject/melon.js', 'lib'],
    ['@melonproject/graphql-schema', 'src'],
    ['@melonproject/manager-components', 'src'],
    ['@melonproject/exchange-aggregator', 'src'],
  ],
  distDir: path.join('..', 'build'),
  exportPathMap: () => require('./next.routes.js'),
  publicRuntimeConfig: {
    graphqlRemoteWs: process.env.GRAPHQL_REMOTE_WS,
    graphqlRemoteHttp: process.env.GRAPHQL_REMOTE_HTTP,
    jsonRpcEndpoint: process.env.JSON_RPC_ENDPOINT,
    track: process.env.TRACK,
    isElectron: isElectron,
  },
  webpack: (config, options) => {
    config.resolve.alias = Object.assign({}, config.resolve.alias || {}, {
      // Override the mock link component used in the manager components.
      '~/link': 'next/link',

      // Aliases for paths within the manager components package.
      '~/blocks': path.join(managerComponents, 'src', 'blocks'),
      '~/components': path.join(managerComponents, 'src', 'components'),
      '~/templates': path.join(managerComponents, 'src', 'templates'),
      '~/design': path.join(managerComponents, 'src', 'design'),
      '~/static': path.join(managerComponents, 'public', 'static'),

      // Aliases for paths within the manager interface package.
      '+/components': path.join(managerInterface, 'src', 'components'),
      '~/utils': path.join(managerInterface, 'src', 'shared', 'utils'),
      '~/electron': path.join(managerInterface, 'src', 'electron'),

      // Special alias for importing the apollo web transport.
      '~/apollo': isElectron ?
        path.join(managerInterface, 'src', 'shared', 'apollo', 'index.app') :
        path.join(managerInterface, 'src', 'shared', 'apollo', 'index.web'),
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        __MANAGER_INTERFACE_VERSION__: JSON.stringify(managerPkg.version),
        __MELON_JS_VERSION__: JSON.stringify(melonJsPkg.version),
        __SMART_CONTRACTS_VERSION__: JSON.stringify(smartContractsPkg.version),
      }),
    );

    config.plugins.push(new webpack.DefinePlugin({
      ELECTRON: isElectron,
    }));

    if (!options.isServer) {
      const CopyWebpackPlugin = require('copy-webpack-plugin');
      config.plugins.push(
        new CopyWebpackPlugin([
          {
            context: path.join(managerComponents, 'public', 'static'),
            from: '**/*',
            to: path.join(options.dir, 'static'),
            force: true,
          },
        ]),
      );

      if (options.dev) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
        config.plugins.push(new BundleAnalyzerPlugin({
          analyzerPort: 3001,
          openAnalyzer: false,
        }));
      }
    }

    config.module.rules.push({
      test: /\.css$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: 'scoped'
          },
        },
      ]
    });

    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
    });

    return config;
  },
});
