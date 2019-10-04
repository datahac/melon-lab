import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import ImportWallet from './index';

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
  onImportFile: action('parseWallet'),
  file: true,
};

storiesOf('Components|Import Wallet', module).add('Default', () => {
  return <ImportWallet {...data} />;
});
