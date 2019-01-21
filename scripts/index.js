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
        const cwd = process.cwd();
        exec('next build renderer', {
          cwd,
        });

        exec('next export renderer -o build/renderer', {
          cwd,
        });

        break;
      }

      default: {
        throw new Error('Invalid entry point.');
      }
    }
  });

commander
  .command('dev')
  .description('Runs the application in development mode.')
  .action(async () => {
    defaultEnv('NODE_ENV', 'development');

    const config = require('../main/webpack.config');
    const paths = Object
      .keys(config.entry)
      .map(entry => path.join(config.output.path, `${entry}.js`));

    try {
      await new Promise((resolve, reject) => {
        webpack(config).watch({}, R.once((error, stats) => {
          if (error) {
            reject(error);
          }
          else {
            resolve();
          }
        }));
      });

      nodemon({
        script: paths[0],
        watch: paths,
        exec: 'electron',
      }).on('quit', process.exit);
    }
    catch (error) {
      console.error(error);
      process.exit(1);
    }
  });

commander.parse(process.argv);
