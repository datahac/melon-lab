import { storiesOf } from '@storybook/react';
import React from 'react';
import RedeemForm from './';

const data = {
  values: {
    quantity: {
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
};

storiesOf('Components|Redeem Form', module).add('Default', () => {
  return <RedeemForm {...data} />;
});
