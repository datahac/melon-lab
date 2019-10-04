import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Selector from './index';

const data = {
  availableItems: [
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

storiesOf('Components|Selector', module).add('Default', () => {
  return <Selector {...data} />;
});
