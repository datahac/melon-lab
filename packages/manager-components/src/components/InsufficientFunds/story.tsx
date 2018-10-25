import { storiesOf } from '@storybook/react';
import React from 'react';
import InsufficientFunds from './index';

const data = {
  eth: 0.1,
  address: '0x1231235124613461346',
};

storiesOf('Components|Insufficient Funds', module).add('Default', () => {
  return <InsufficientFunds {...data} />;
});
