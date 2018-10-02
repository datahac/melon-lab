const postcssPresetEnv = require('postcss-preset-env');
const variables = require('../manager-components/src/design/variables');
const medias = require('../manager-components/src/design/medias');

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 2,
      browsers: '> 0.5%, last 2 versions, Firefox ESR, not dead',
      features: {
        'nesting-rules': true,
        'color-mod-function': {
          unresolved: 'warn'
        },
        'custom-properties': {
          preserve: false,
          variables: variables,
        },
        'custom-media-queries': {
          extensions: medias,
        },
      },
    }),
  ],
};
