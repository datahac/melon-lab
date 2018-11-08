#!/usr/bin/env node

const path = require('path')
const spawn = require('cross-spawn')

args = process.argv.slice(2);

const getBin = () => {
  if (args[0] && args[0].indexOf('/app/main.js') !== -1) {
    return path.resolve(path.join(process.cwd(), 'node_modules', '.bin', 'electron'));
  }

  return 'node';
};

const proc = spawn(getBin(), args, { stdio: 'inherit'});
proc.on('close', (code) => process.exit(code));
proc.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
