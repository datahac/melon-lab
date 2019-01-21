import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import Layout from '../design/Layout';

const stories = require.context('../', true, /\/story\.(tsx?)$/);

const CenterDecorator = storyFn => {
  const a = storyFn()
  if (storyFn().type.name !== 'Layout') {
    return <Layout>{a}</Layout>;
  } else {
    return a;
  }
};

addDecorator(CenterDecorator);

configure(() => {
  return stories.keys().forEach(stories);
}, module);

setOptions({
  hierarchySeparator: /\/|\./, // matches a . or /
  hierarchyRootSeparator: /\|/, //matches a |
  name: 'Melonport',
  url: '#',
});
