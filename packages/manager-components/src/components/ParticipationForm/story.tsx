import { storiesOf } from '@storybook/react';
import React from 'react';
import ParticipationForm from './container';

const data = {
  initialValues: {
    price: 1.0,
    type: 'Invest',
  },
  decimals: 4,
  setup: true,
  priceFeedUp: true,
  quoteAsset: 'WETH-T',
  fund: {
    sharePrice: 5,
  },
};

storiesOf('Components|Participation Form', module).add('Default', () => {
  return <ParticipationForm {...data} />;
});
