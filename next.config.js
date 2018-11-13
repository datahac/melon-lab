require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

const path = require('path');
const R = require('ramda');
const webpack = require('webpack');
const withTypeScript = require('@zeit/next-typescript');

const srcDir = path.resolve(__dirname, 'src');
const isElectron = !!JSON.parse(process.env.ELECTRON || 'false');
const distConfig = require('./next.config.dist.js');

const apolloLink = (electron, server) => {
  if (electron) {
    return 'app';
  }

  if (server) {
    return 'server';
  }

  return 'browser';
};

module.exports = withTypeScript(Object.assign({}, distConfig, {
  exportPathMap: () => require('./next.routes.js'),
  webpack: (config, options) => {
    config.resolve.alias = Object.assign({}, config.resolve.alias || {}, {
      // Override the mock link component used in the manager components.
      '~/link': 'next/link',

      '~/blocks': path.join(srcDir, 'storybook', 'blocks'),
      '~/components': path.join(srcDir, 'storybook', 'components'),
      '~/templates': path.join(srcDir, 'storybook', 'templates'),
      '~/design': path.join(srcDir, 'storybook', 'design'),
      '~/static': path.join(srcDir, 'static'),
      '~/utils': path.join(srcDir, 'shared', 'utils'),
      '~/electron': path.join(srcDir, 'electron'),
      '~/schema': path.join(srcDir, 'schema'), 
      '~/error': path.join(srcDir, 'pages', '_error'),

      // TODO: Give this a better name.
      '+/components': path.join(srcDir, 'components'),

      // Special alias for importing the apollo web transport.
      '~/apollo': path.join(srcDir, 'shared', 'apollo', apolloLink(isElectron, options.isServer)),
    });

    config.plugins.push(new webpack.DefinePlugin({
      ELECTRON: isElectron,
    }));

    if (!options.isServer) {
      if (options.dev) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
        config.plugins.push(new BundleAnalyzerPlugin({
          analyzerPort: 3001,
          openAnalyzer: false,
        }));
      }
    }

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: [/node_modules/, /\/schema\.(graphql|gql)$/],
      loader: 'graphql-tag/loader',
    });

    // Treat schema.gql files differently by directly loading their introspection
    // results instead of importing their AST.
    config.module.rules.unshift({
      test: /\/schema\.gql$/,
      exclude: /node_modules/,
      loader: require.resolve('./introspect.js'),
    });

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
}));
