import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import ImportWallet from './container';

const data = {
  initialValues: {
    password: '',
  },
  onSubmit: action('onSubmit'),
  onImportFile: action('parseWallet'),
};

storiesOf('Components|Import Wallet', module).add('Default', () => {
  return <ImportWallet {...data} />;
});
