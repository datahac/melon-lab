const path = require('path');
const find = require('find-up');
const webpack = require('webpack');
const externals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const FriendlyErrors = require('friendly-errors-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  stats: 'errors-only',
  target: 'electron-main',
  context: path.resolve(__dirname),
  entry: {
    index: './index.ts',
    preload: './preload.ts',
  },
  output: {
    path: path.resolve(__dirname, '..', 'build', 'main'),
    filename: '[name].js',
  },
  externals: externals({
    whitelist: [
      /\.(eot|woff|woff2|ttf|otf)$/,
      /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
      /\.(mp4|mp3|ogg|swf|webp)$/,
      /\.(css|scss|sass|less|styl)$/,
    ],
  }),
  resolve: {
    extensions: ['.ts', '.js', '.node'],
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  plugins: [
    new FriendlyErrors(),
    new Dotenv({
      path: find.sync(['.env', '.env.defaults']),
      systemvars: true,
    }),
  ],
  performance: {
    hints: false,
  },
  optimization:{
    minimize: false,
    noEmitOnErrors: true,
  },
  node: {
    __dirname: false,
    __filename: false
  },
};
