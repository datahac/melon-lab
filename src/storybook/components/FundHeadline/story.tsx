import { storiesOf } from '@storybook/react';
import React from 'react';
import FundHeadline from './index';

const data = {
  title: 'Your Wallet',
  icon: 'icons_wallet',
  text: 'Hello World',
  gav: {
    quantity: '10000',
    token: {
      symbol: 'ETH',
      decimals: 4,
    },
  },
  sharePrice: {
    base: {
      quantity: '10000',
      token: {
        symbol: 'ETH',
        decimals: 4,
      },
    },
    quote: {
      quantity: '10000',
      token: {
        symbol: 'ETH',
        decimals: 4,
      },
    },
  },
};

storiesOf('Components|Fund Headline', module).add('Default', () => {
  return <FundHeadline {...data} />;
});
