const path = require('path');

module.exports = {
  babelrcRoots: [
    // Allow any linked packages.
    path.resolve(__dirname, '..', '*'),
  ],
};
