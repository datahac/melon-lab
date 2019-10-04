import { storiesOf } from '@storybook/react';
import React from 'react';
import Holding from './index';

const data = {
  fraction: 6.2956,
  balance: {
    quantity: '10000',
    token: {
      symbol: 'ETH',
      decimals: 4,
    },
  },
  price: {
    base: {
      quantity: '1',
      token: {
        symbol: 'ETH',
        decimals: 4,
      },
    },
    quote: {
      quantity: '1',
      token: {
        symbol: 'MLN',
        decimals: 4,
      },
    },
  },
  symbol: 'MLN',
};

storiesOf('Blocks|Holding', module).add('Default', () => {
  return <Holding {...data} />;
});
