import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Switch from './index';

const data = {
  options: ['ETH-T-M', 'MLN-T-M'],
  labels: ['Buy', 'Sell'],
  name: 'name',
  value: 'value',
  onChange: action('changed'),
};

storiesOf('Blocks|Switch', module).add('Default', () => {
  return <Switch {...data} />;
});
