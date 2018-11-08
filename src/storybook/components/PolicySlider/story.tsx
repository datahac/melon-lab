import { storiesOf } from '@storybook/react';
import React from 'react';
import PolicySlider from './index';

const data = {
  name: 'Max Position',
  description: 'The higher the tolerance, the greate the risk',
  defaultValue: '50',
  value: '50',
};

storiesOf('Components|Slider Policy', module).add('Default', () => {
  return <PolicySlider {...data} />;
});
