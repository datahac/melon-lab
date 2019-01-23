const path = require('path');
const find = require('find-up');
const Dotenv = require('dotenv-webpack');

// The path to the graphql schema.
const schema = path.resolve(__dirname, '..', 'main', 'graphql', 'schema.gql');

module.exports = require('@zeit/next-typescript')({
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
  webpack: (config, options) => {
    config.target = 'electron-renderer';
    config.devtool = false;

    config.resolve.alias = Object.assign({}, config.resolve.alias || {}, {
      // Override the mock link component used in storybook.
      '~/link': 'next/link',
      // Schema introspection for apollo.
      '~/introspection': schema,
      '~/queries': path.join(__dirname, 'queries'),
      '~/shared': path.join(__dirname, 'shared'),
      '~/static': path.join(__dirname, 'static'),
      '~/error': path.join(__dirname, 'pages', '_error'),
      // TODO: Find a better name for this.
      '+/components': path.join(__dirname, 'components'),
      // TODO: Move all this to a single alias for the storybook directory.
      '~/components': path.join(__dirname, 'storybook', 'components'),
      '~/blocks': path.join(__dirname, 'storybook', 'blocks'),
      '~/design': path.join(__dirname, 'storybook', 'design'),
      '~/templates': path.join(__dirname, 'storybook', 'templates'),
    });

    config.module.exprContextCritical = false;
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      include: path.resolve(__dirname),
      loader: 'graphql-tag/loader',
    });

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      include: schema,
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
      ],
    });

    config.plugins.push(
      new Dotenv({
        path: find.sync(['.env', '.env.defaults']),
        systemvars: true,
      }),
    );

    config.node = {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    };

    config.performance = Object.assign({}, config.performance, {
      hints: false,
    });

    config.optimization = Object.assign({}, config.optimization, {
      minimize: false,
    });

    return config;
  },
});
