import { storiesOf } from '@storybook/react';
import React from 'react';
import ParticipationForm from './';

const data = {
  values: {
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
    type: 'Invest',
    quantity: {
      quantity: '10000',
      token: {
        symbol: 'ETH',
        decimals: 4,
      },
    },
    total: {
      quantity: '10000',
      token: {
        symbol: 'ETH',
        decimals: 4,
      },
    },
  },
  errors: {},
  touched: {},
  decimals: 4,
  setup: true,
};

storiesOf('Components|Participation Form', module).add('Default', () => {
  return <ParticipationForm {...data} />;
});
