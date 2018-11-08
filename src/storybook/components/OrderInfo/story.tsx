import { storiesOf } from '@storybook/react';
import React from 'react';
import OrderInfo from './index';

const data = {
  lastPrice: 0.5,
  bid: 0,
  ask: 0,
  tokens: {
    baseToken: {
      name: 'ETH-T',
      balance: 30.0,
    },
    quoteToken: {
      name: 'MLN-T',
      balance: 20.0,
    },
  },
};

storiesOf('Components|Order Info', module).add('Default', () => {
  return <OrderInfo {...data} />;
});
