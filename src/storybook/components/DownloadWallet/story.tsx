import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import DownloadWallet from './index';

const data = {
  values: {
    password: '',
  },
  touched: {
    password: null,
  },
  error: {
    password: null,
  },
  handleSubmit: action('onSubmit'),
};

storiesOf('Components|Download Wallet', module).add('Default', () => {
  return <DownloadWallet {...data} />;
});
