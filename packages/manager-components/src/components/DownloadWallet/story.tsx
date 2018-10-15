import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import DownloadWallet from './index';

const data = {
  initialValues: {
    password: '',
  },
  onSubmit: action('onSubmit'),
};

storiesOf('Components|Download Wallet', module).add('Default', () => {
  return <DownloadWallet {...data} />;
});
