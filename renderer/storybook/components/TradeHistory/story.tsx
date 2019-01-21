import { storiesOf } from '@storybook/react';
import React from 'react';
import TradeHistory from './index';

const data = {
  trades: [
    {
      timestamp: '00/00/0000',
      type: 'buy',
      price: '0.23424323',
      buyToken: 'MLN',
      sellToken: 'ETH',
      quantity: '234.234234',
    },
    {
      timestamp: '00/00/0000',
      type: 'sell',
      price: '0.23424323',
      buyToken: 'MLN',
      sellToken: 'ETH',
      quantity: '234.234234',
    },
  ],
};

storiesOf('Components|Trade History', module).add('Default', () => {
  return <TradeHistory {...data} />;
});
