const path = require('path');
const src = path.resolve(__dirname, '..', '..', 'src');
const base = path.join(src, 'storybook');

module.exports = config => {
  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    '~/static': path.join(src, 'static'),
    '~/utils': path.join(src, 'shared', 'utils'),
    '~/design': path.join(base, 'design'),
    '~/components': path.join(base, 'components'),
    '~/blocks': path.join(base, 'blocks'),
    '~/templates': path.join(base, 'templates'),
    '~/containers': path.join(base, 'containers'),
    '~/link': path.join(base, 'link'),
  });

  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      loader: 'babel-loader',
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'babel-loader',
        },
        {
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: 'scoped'
          },
        }
      ],
      include: base,
    },
    {
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
    },
  );

  config.devServer = Object.assign({}, config.devServer || {}, {
    stats: 'errors-only',
  });

  return config;
};
