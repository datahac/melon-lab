import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import GenerateWallet from './index';

const data = {
  mnemonic:
    'next glass shell collect erupt image drive tumble motor gym glove inside',
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

  onSubmit: action('onSubmit'),
  showForm: true,
};

storiesOf('Components|Generate Wallet', module).add('Default', () => {
  return <GenerateWallet {...data} />;
});
