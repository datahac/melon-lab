import { storiesOf } from '@storybook/react';
import React from 'react';
import ParticipationForm from './';

const data = {
  values: {
    price: 1,
    type: 'Invest',
    quantity: 1,
    total: 1,
  },
  errors: {},
  touched: {},
  decimals: 4,
  setup: true,
  quoteAsset: 'WETH',
};

storiesOf('Components|Participation Form', module).add('Default', () => {
  return <ParticipationForm {...data} />;
});
