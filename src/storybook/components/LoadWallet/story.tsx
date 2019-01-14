import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import LoadWallet from './';

const data = {
  values: {
    password: '',
  },
  touched: {},
  errors: {},
  onSubmit: action('onSubmit'),
};

storiesOf('Components|Load Wallet', module).add('Default', () => {
  return <LoadWallet {...data} />;
});
