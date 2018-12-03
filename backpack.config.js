require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

const DotEnv = require('dotenv-webpack');
const path = require('path');
const isElectron = !!JSON.parse(process.env.ELECTRON || 'false');
const watchModules = ['@melonproject'];

module.exports = {
  webpack: (config, options, webpack) => {
    config.resolve.extensions.push('.ts', '.node');

    const base = path.resolve(__dirname, 'src');
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      '~/schema': path.join(base, 'schema'),
    });

    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: require.resolve('babel-loader'),
    });

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    config.watchOptions = {
      ignored: new RegExp(`node_modules(?!\/(${watchModules.join('|')})(?!.*node_modules))`),
      aggregateTimeout: 500,
    };

    if (isElectron || (process.platform === 'win32' || process.env.NODE_ENV === 'production')) {
      // Disable source maps and remove the source map loader (in the banner).
      // TODO: Figure out how we can make use of source maps in electron.
      // TODO: The source-map support added with the banner plugin has the wrong paths in windows.
      config.plugins = config.plugins.filter(
        plugin => !(plugin instanceof webpack.BannerPlugin),
      );
    }

    if (isElectron) {
      config.mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
      config.devtool = false;
      config.target = 'electron-main';
      config.output.path = path.resolve(__dirname, 'app');
      config.entry = {
        main: './src/electron/main/index.ts',
        preload: './src/electron/main/preload.ts',
      };

      config.resolve.alias = Object.assign({}, config.resolve.alias, {
        '~/electron': path.join(base, 'electron'),
      });

      config.plugins.push(new DotEnv({
        path: envPath,
        systemvars: true,
      }));

      // Disable polyfilling of __dirname and __filename.
      config.node = Object.assign(config.node || {}, {
        __dirname: false,
        __filename: false,
      });
    } else {
      config.output.path = path.resolve(__dirname, 'build');
      config.entry = {
        server: './src/server/index.ts',
      };
    }

    return config;
  },
};
