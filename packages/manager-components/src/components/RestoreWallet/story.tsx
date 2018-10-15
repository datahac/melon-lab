import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import RestoreWallet from './index';

const data = {
  values: {
    mnemonic: '',
    password: '',
  },
  touched: {
    mnemonic: null,
    password: null,
  },
  error: {
    mnemonic: null,
    password: null,
  },
  handleSubmit: action('onSubmit'),
};

storiesOf('Components|Restore Wallet', module).add('Default', () => {
  return <RestoreWallet {...data} />;
});
