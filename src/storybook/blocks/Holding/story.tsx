import { storiesOf } from '@storybook/react';
import React from 'react';
import Holding from './index';

const data = {
  fraction: '6.2956',
  balance: '4.328993592',
  price: '0.0602380834',
  symbol: 'MLN',
};

storiesOf('Blocks|Holding', module).add('Default', () => {
  return <Holding {...data} />;
});
