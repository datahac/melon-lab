#! /usr/bin/env node

const R = require('ramda');
const path = require('path');
const webpack = require('webpack');
const commander = require('commander');
const nodemon = require('nodemon');
const exec = require("child_process").execSync;

process.on('SIGINT', process.exit);

const defaultEnv = (key, value) => {
  if (typeof process.env[key] === 'undefined') {
    process.env[key] = value;
  }
};

commander
  .command('build <entry>')
  .description('Builds the given application entry point.')
  .action((entry) => {
    defaultEnv('NODE_ENV', 'production');

    switch (entry) {
      case 'main': {
        const config = require('../main/webpack.config');
        const compiler = webpack(config);
        compiler.run((error, stats) => {
          if (error) {
            console.error(error);
            process.exit(1);
          }
        });

        break;
      }

      case 'renderer': {
        exec('next build renderer', { stdio: 'inherit' });
        exec('next export renderer -o build/renderer', { stdio: 'inherit' });

        break;
      }

      default: {
        throw new Error('Invalid entry point.');
      }
    }
  });

commander
  .command('dev [<component>]')
  .description('Runs the given component (graphql/next/electron) in development mode.')
  .action(async (component) => {
    const mode = (() => {
      switch (component) {
        case 'graphql': return 'graphql';
        case 'next': return 'next';
        default: return 'electron';
      }
    })();

    defaultEnv('NODE_ENV', 'development');
    defaultEnv('ELECTRON', `${mode === 'electron'}`);

    if (mode === 'next') {
      return exec('next dev renderer', { stdio: 'inherit' });
    }

    const config = require('../main/webpack.config');
    const paths = Object
      .keys(config.entry)
      .map(entry => path.join(config.output.path, `${entry}.js`));

    try {
      await new Promise((resolve, reject) => {
        webpack(config).watch({}, R.once((error) => {
          if (error) {
            reject(error);
          }
          else {
            resolve();
          }
        }));
      });

      await new Promise((resolve, reject) => {
        nodemon({
          script: paths[0],
          watch: paths,
          exec: mode === 'electron' ? 'electron' : 'node',
        })
        .on('quit', process.exit)
        .on('start', () => {
          resolve();
        })
        .on('crash', () => {
          reject(new Error('Nodemon has crashed.'));
        })
      });
    }
    catch (error) {
      console.error(error);
      process.exit(1);
    }
  });

commander.parse(process.argv);
