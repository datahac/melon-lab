const path = require('path');
const src = path.resolve(__dirname, '..', '..');
const base = path.join(src, 'storybook');

module.exports = config => {
  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    '~/static': path.join(src, 'static'),
    '~/shared': path.join(src, 'shared'),
    '~/design': path.join(base, 'design'),
    '~/components': path.join(base, 'components'),
    '~/blocks': path.join(base, 'blocks'),
    '~/templates': path.join(base, 'templates'),
    '~/containers': path.join(base, 'containers'),
    '~/link': path.join(base, 'link'),
  });

  console.log(JSON.stringify(path.join(src, 'postcss.config.js')));
  config.module.rules.unshift({
    test: /\.css$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: require('styled-jsx/webpack').loader,
        options: {
          type: 'scoped',
        },
      },
    ],
    include: base,
  });

  config.module.rules.unshift({
    test: /\.(ts|tsx)$/,
    loader: 'babel-loader',
  });

  config.module.rules.push({
    test: /\.svg$/,
    loader: 'svg-sprite-loader',
  });

  config.devServer = Object.assign({}, config.devServer || {}, {
    stats: 'errors-only',
  });

  return config;
};
