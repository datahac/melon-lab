import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Header from './index';

const data = {
  status: { message: 'Melon Node' },
  balances: {
    eth: 1.23422234,
  },
  account: {
    address: '0xa80B…d46f',
  },
  network: 'kovan',
  goToHome: action('goToHome'),
  goToWallet: action('goToWallet'),
};

storiesOf('Components|Header', module).add('Default', () => {
  return <Header {...data} />;
});
