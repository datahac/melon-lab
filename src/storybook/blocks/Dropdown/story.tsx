import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Dropdown from './index';

const data = {
  name: 'name',
  options: [{ value: 'one', name: 'One' }, { value: 'two', name: 'Two' }],
  onChange: action('clicked'),
};

storiesOf('Blocks|Dropdown', module)
  .add('Default', () => {
    return <Dropdown {...data} />;
  })
  .add('With label', () => {
    return <Dropdown {...data} label="Exchange" />;
  });
