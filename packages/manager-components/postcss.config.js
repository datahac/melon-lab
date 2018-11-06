const postcssPresetEnv = require('postcss-preset-env');
const variables = require('./src/design/variables');
const medias = require('./src/design/medias');

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 2,
      preserve: false,
      browsers: '> 0.5%, last 2 versions, Firefox ESR, not dead',
      features: {
        'nesting-rules': true,
        'color-mod-function': {
          unresolved: 'warn',
        },
      },
      importFrom: [
        {
          customProperties: variables,
          customMedia: medias,
        },
      ],
    }),
  ],
};
