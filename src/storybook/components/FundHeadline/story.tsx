import { storiesOf } from '@storybook/react';
import React from 'react';
import FundHeadline from './index';

const data = {
  title: 'Your Wallet',
  icon: 'icons_wallet',
  text: 'Hello World',
};

storiesOf('Components|Fund Headline', module).add('Default', () => {
  return <FundHeadline {...data} />;
});
