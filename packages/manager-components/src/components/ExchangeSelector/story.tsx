import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import ExchangeSelector from './index';

const data = {
  availableExchanges: [
    {
      value: 'One',
      text: 'One',
    },
    {
      value: 'Two',
      text: 'Two',
    },
    {
      value: 'Three',
      text: 'Three',
    },
  ],
};

storiesOf('Components|Exchnage selector', module).add('Default', () => {
  return <ExchangeSelector {...data} />;
});
