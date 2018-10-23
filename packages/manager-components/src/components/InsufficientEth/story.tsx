import { storiesOf } from '@storybook/react';
import React from 'react';
import InsufficientEth from './index';

const data = {
  eth: 0.1,
  address: '0x1231235124613461346',
};

storiesOf('Components|InsufficientEth', module).add('Default', () => {
  return <InsufficientEth {...data} />;
});
