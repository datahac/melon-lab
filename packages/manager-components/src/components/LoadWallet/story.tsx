import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import LoadWallet from './container';

const data = {
  initialValues: {
    password: '',
  },
  onSubmit: action('onSubmit'),
};

storiesOf('Components|Load Wallet', module).add('Default', () => {
  return <LoadWallet {...data} />;
});
