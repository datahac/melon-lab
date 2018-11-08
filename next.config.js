require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

const path = require('path');
const R = require('ramda');
const webpack = require('webpack');
const withTypeScript = require('@zeit/next-typescript');
const withQueryFiles = require('./config/withQueryFiles');
const withComposedConfig = R.compose(
  withQueryFiles,
  withTypeScript,
);

const srcDir = path.resolve(__dirname, 'src');
const isElectron = !!JSON.parse(process.env.ELECTRON || 'false');
const distConfig = require('./next.config.dist.js');

module.exports = withComposedConfig(Object.assign({}, distConfig, {
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
      '~/apollo': isElectron ?
        path.join(srcDir, 'shared', 'apollo', 'index.app') :
        path.join(srcDir, 'shared', 'apollo', 'index.web'),
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
