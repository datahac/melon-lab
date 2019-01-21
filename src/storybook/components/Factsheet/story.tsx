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
  personalStake: {
    quantity: '10000',
    token: {
      symbol: 'ETH',
      decimals: 4,
    },
  },
  quoteAsset: {
    symbol: 'WETH',
  },
  rank: '1',
  shutdown: action('shitdown'),
  totalSupply: {
    quantity: '10000',
    token: {
      symbol: 'ETH',
      decimals: 4,
    },
  },
  tweetHref: 'melonport',
  reportUrl: 'https://melon-reporting.now.sh/report/',
};

storiesOf('Components|Factsheet', module).add('Default', () => {
  return <Factsheet {...data} />;
});
