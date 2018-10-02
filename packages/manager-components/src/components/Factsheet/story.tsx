import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Factsheet from './index';

const data = {
  gav: '0.9824',
  creationDate: '24. Jul 2018 09:19',
  priceFeedUp: false,
  expectedPrize: '0.54321',
  isCompetition: false,
  loading: false,
  managementReward: '0.0000',
  name: 'Melon Fund',
  numberOfFunds: '12',
  performanceReward: '0.0000',
  personalStake: '1.0000',
  quoteAsset: 'WETH-T',
  rank: '1',
  sharePrice: '0.9824',
  shutdown: action('shitdown'),
  totalSupply: '1.0000',
  tweetHref: 'melonport',
  reportUrl: 'https://melon-reporting.now.sh/report/',
};

storiesOf('Components|Factsheet', module).add('Default', () => {
  return <Factsheet {...data} />;
});
