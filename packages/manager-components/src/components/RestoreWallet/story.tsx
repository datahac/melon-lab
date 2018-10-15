import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import RestoreWallet from './index';

const data = {
  initialValues: {
    mnemonic: '',
    password: '',
  },
  onSubmit: action('onSubmit'),
};

storiesOf('Components|Restore Wallet', module).add('Default', () => {
  return <RestoreWallet {...data} />;
});
