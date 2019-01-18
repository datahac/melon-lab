const DotEnv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  webpack: (config, options, webpack) => {
    config.resolve.extensions.push('.ts', '.node');

    const base = path.resolve(__dirname, 'src');
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      '~/schema': path.join(base, 'schema'),
      '~/shared': path.join(base, 'shared'),
    });

    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    });

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    config.mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
    // config.devtool = false;
    config.target = 'electron-main';
    config.output.path = path.resolve(__dirname, 'app');
    config.entry = {
      main: './src/electron/index.ts',
      preload: './src/electron/preload.ts',
    };

    config.plugins.push(new DotEnv({
      path: require('find-up').sync(['.env', '.env.defaults']),
      systemvars: true,
    }));

    // Disable polyfilling of __dirname and __filename.
    config.node = Object.assign(config.node || {}, {
      __dirname: false,
      __filename: false,
    });

    return config;
  },
};
