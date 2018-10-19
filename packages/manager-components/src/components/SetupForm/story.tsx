import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Setup from './index';

const data = {
  values: {
    name: '',
  },
  touched: {
    name: null,
  },
  error: {
    name: null,
  },
  config: {
    canonicalPriceFeedAddress: 'foo',
    competitionComplianceAddress: 'bar',
    onlyManagerCompetitionAddress: 'foo',
  },
  onSubmit: action('onSubmit'),
  signed: true,
  balances: {
    eth: 0.1,
  },
  availableExchanges: [
    {
      value: 'RADAR_RELAY',
      text: 'Radar Relay',
    },
    {
      value: 'ERC_DEX',
      text: 'ERC Dex',
    },
    {
      value: 'OASIS_DEX',
      text: 'OasisDex',
    },
    {
      value: 'KYBER_NETWORK',
      text: 'Kyber',
    },
  ],
};

storiesOf('Components|Setup', module).add('Default', () => {
  return <Setup {...data} />;
});
