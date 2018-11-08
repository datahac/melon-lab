import { storiesOf } from '@storybook/react';
import React from 'react';
import LockedWallet from './index';

storiesOf('Components|Locked Wallet', module).add('Default', () => {
  return <LockedWallet />;
});
