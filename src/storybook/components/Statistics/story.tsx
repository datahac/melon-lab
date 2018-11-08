import { storiesOf } from '@storybook/react';
import React from 'react';
import Statistics from './index';

const data = {
  rewardsSum: '0',
  investmentsSum: '0',
  redeemalsSum: '0',
  tradesCount: '0',
  highestSharePrice: '0',
  netAssetValue: '0',
};

storiesOf('Components|Statistics', module).add('Default', () => {
  return <Statistics {...data} />;
});
