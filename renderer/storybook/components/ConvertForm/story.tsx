import { storiesOf } from '@storybook/react';
import React from 'react';
import ConvertForm from './';

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

storiesOf('Components|Convert Form', module).add('Default', () => {
  return <ConvertForm {...data} />;
});
