import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import GenerateWallet from './container';

const data = {
  mnemonic:
    'next glass shell collect erupt image drive tumble motor gym glove inside',
  initialValues: {
    mnemonic: '',
    password: '',
  },
  onSubmit: action('onSubmit'),
};

storiesOf('Components|Generate Wallet', module).add('Default', () => {
  return <GenerateWallet {...data} />;
});
