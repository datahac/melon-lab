import { storiesOf } from '@storybook/react';
import React from 'react';
import Headline from './index';

const data = {
  title: 'Your Wallet',
  icon: 'wallet',
  text: 'Hello World',
};

storiesOf('Blocks|Headline', module).add('Default', () => {
  return <Headline {...data} />;
});
