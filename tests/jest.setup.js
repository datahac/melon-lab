require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});
