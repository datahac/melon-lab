import { storiesOf } from '@storybook/react';
import React from 'react';
import FundHeadline from './index';

const data = {
  title: 'Your Wallet',
  icon: 'wallet',
  text: 'Hello World',
  name: 'My Fund',
  address: '0x0CAB71b27Af9f4caF4484EAcC45B547f6CB07B80',
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
