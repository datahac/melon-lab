const path = require('path');
const base = path.resolve(__dirname, '..', 'src');
const public = path.resolve(__dirname, '..', 'public');

module.exports = config => {
  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    '~/design': path.join(base, 'design'),
    '~/components': path.join(base, 'components'),
    '~/blocks': path.join(base, 'blocks'),
    '~/templates': path.join(base, 'templates'),
    '~/containers': path.join(base, 'containers'),
    '~/utils': path.join(base, 'utils'),
    '~/static': path.join(public, 'static'),
    '~/link': path.join(base, 'utils', 'link'),
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
      include: path.resolve(__dirname, '..', 'src'),
    },
    {
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
    },
  );

  return config;
};
