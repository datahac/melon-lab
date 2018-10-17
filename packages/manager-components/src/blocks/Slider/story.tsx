import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Slider from './index';

const data = {
  min: 1,
  max: 100,
  onClick: action('clicked'),
};

storiesOf('Blocks|Slider', module).add('Default', () => {
  return <Slider {...data} />;
});
