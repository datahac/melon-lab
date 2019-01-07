import { storiesOf } from '@storybook/react';
import React from 'react';
import OrderInfo from './index';

const data = {
  lastPrice: 0.5,
  bid: 0,
  ask: 0,
  tokens: {
    baseToken: {
      quantity: 3000000000000000000,
      token: {
        symbol: 'ETH',
        decimals: 18,
      },
    },
    quoteToken: {
      quantity: 1000000000000000000,
      token: {
        symbol: 'MLN',
        decimals: 18,
      },
    },
  },
};

storiesOf('Components|Order Info', module).add('Default', () => {
  return <OrderInfo {...data} />;
});
