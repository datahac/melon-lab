import { storiesOf } from '@storybook/react';
import React from 'react';
import TransactionProgress from './index';

const data = {
  activeTransaction: 'createB',
  transactions: [
    {
      name: 'createA',
      isComplete: true,
    },
    {
      name: 'createB',
      isComplete: false,
    },
    {
      name: 'createC',
      isComplete: false,
    },
  ],
};

storiesOf('Components|TransactionProgress', module).add('Default', () => {
  return <TransactionProgress {...data} />;
});
