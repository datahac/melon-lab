const envPath = require('find-up').sync(['.env', '.env.defaults']);

require('dotenv').config({
  path: envPath,
});

const DotEnv = require('dotenv-webpack');
const path = require('path');
const externals = require('webpack-node-externals');

module.exports = {
  webpack: (config, options, webpack) => {
    if (!!JSON.parse(process.env.ELECTRON || 'false')) {
      config.mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
      config.target = 'electron-main';
      config.output.path = path.resolve(__dirname, 'app');
      config.entry = {
        main: './src/electron/main/index.ts',
        preload: './src/electron/main/preload.ts',
      };

      config.resolve.extensions.push('.ts', '.node');

      const base = path.resolve(__dirname, 'src');
      config.resolve.alias = Object.assign({}, config.resolve.alias, {
        '~/electron': path.join(base, 'electron'),
        '~/schema': path.join(base, 'schema'), 
      });

      // Remove json-loader (not needed anymore).
      config.module.rules = config.module.rules.filter((rule) => {
        if (rule.loader && rule.loader.indexOf('json-loader') !== -1) {
          return false;
        }

        return true;
      });

      config.module.rules.map(rule => {
        if (rule.loader && rule.loader.match('babel-loader')) {
          // @TODO: Backpack uses their own version of babel-loader instead
          // of correctly resolving our version as a peer dependency. Hence, we
          // need to override this here so we can use Babel 7+.
          // @see https://github.com/jaredpalmer/backpack/issues/106
          rule.loader = require.resolve('babel-loader');
        }

        return rule;
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

      // Disable source maps and remove the source map loader (in the banner).
      // TODO: Figure out how we can make use of source maps in electron.
      config.devtool = false;
      config.plugins = config.plugins.filter(
        plugin => !(plugin instanceof webpack.BannerPlugin),
      );

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
      config.mode = 'none';
      config.output.path = path.resolve(__dirname, 'build');
      config.entry = { index: './src/server/index.ts' };

      config.resolve.extensions.push('.ts', '.node');

      const base = path.resolve(__dirname, 'src');
      config.resolve.alias = Object.assign({}, config.resolve.alias, {
        '~/schema': path.join(base, 'schema'), 
      });

      // Remove json-loader (not needed anymore).
      config.module.rules = config.module.rules.filter((rule) => {
        if (rule.loader && rule.loader.indexOf('json-loader') !== -1) {
          return false;
        }

        return true;
      });

      config.module.rules.map(rule => {
        if (rule.loader && rule.loader.match('babel-loader')) {
          // @TODO: Backpack uses their own version of babel-loader instead
          // of correctly resolving our version as a peer dependency. Hence, we
          // need to override this here so we can use Babel 7+.
          // @see https://github.com/jaredpalmer/backpack/issues/106
          rule.loader = 'babel-loader';
        }

        return rule;
      });

      config.module.rules.push(
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: true,
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.gql$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
      );

      if (process.platform === 'win32' || process.env.NODE_ENV === 'production') {
        // TODO: The source-map support added with the banner plugin has the wrong paths in windows.
        config.plugins = config.plugins.filter(
          plugin => !(plugin instanceof webpack.BannerPlugin),
        );
      }
    }

    config.externals = externals();

    return config;
  },
};
