import { storiesOf } from '@storybook/react';
import React from 'react';
import Headline from './index';

const data = {
  title: 'Your Wallet',
  icon: 'icons_wallet',
  text: 'Hello World',
};

storiesOf('Blocks|Title', module).add('Default', () => {
  return (
    <Headline {...data} />
  );
});
