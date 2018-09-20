require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

const path = require('path');
const R = require('ramda');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
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
const managerApp = path.resolve(path.dirname(require.resolve('@melonproject/manager-app/package.json')));

module.exports = withComposedConfig({
  linkedDependencies: [
    ['@melonproject/melon.js', 'lib'],
    ['@melonproject/graphql-schema', 'src'],
    ['@melonproject/manager-interface', 'src'],
    ['@melonproject/manager-components', 'src'],
    ['@melonproject/exchange-aggregator', 'src'],
    ['@melonproject/manager-app', 'ipc'],
  ],
  distDir: path.join('..', 'build'),
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
  webpack: (config, options) => {
    config.resolve.alias = Object.assign({}, config.resolve.alias || {}, {
      '~/legacy': path.join(managerInterface, 'src', 'legacy'),
      '~/wrappers': path.join(managerInterface, 'src', 'wrappers'),
      '~/blocks': path.join(managerComponents, 'src', 'blocks'),
      '~/components': path.join(managerComponents, 'src', 'components'),
      '~/design': path.join(managerComponents, 'src', 'design'),
      '~/static': path.join(managerComponents, 'public', 'static'),
      '~/ipc': path.join(managerApp, 'ipc'),
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        __MANAGER_INTERFACE_VERSION__: JSON.stringify(managerPkg.version),
        __MELON_JS_VERSION__: JSON.stringify(melonJsPkg.version),
        __SMART_CONTRACTS_VERSION__: JSON.stringify(smartContractsPkg.version),
      }),
    );

    if (!options.isServer) {
      config.plugins.push(
        new CopyWebpackPlugin([
          {
            context: path.join(managerInterface, 'src', 'static'),
            from: '**/*',
            to: path.join(options.dir, 'static'),
            force: true,
          },
        ]),
      );

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
    }

    config.module.rules.push(
      {
        test: /\.css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[folder]-[name].[ext].js',
            },
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: [
                [
                  'styled-jsx/babel',
                  { plugins: ['styled-jsx-plugin-postcss'] },
                ],
              ],
            },
          },
          'styled-jsx-css-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
      },
    );

    config.plugins.push(new webpack.DefinePlugin({ ELECTRON: true }));

    config.plugins.push(new Dotenv({
      path: require('find-up').sync(['.env', '.env.defaults']),
      systemvars: true,
    }));

    // Code splitting doesn't make much sense in an electron app.
    config.plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    );

    return config;
  },
});
