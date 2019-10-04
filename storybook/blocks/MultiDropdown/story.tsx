import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import MultiDropdown from './index';

const data = {
  name: 'name',
  options: [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }],
  onChange: action('clicked'),
};

storiesOf('Blocks|MultiDropdown', module)
  .add('Default', () => {
    return <MultiDropdown {...data} />;
  })
  .add('With label', () => {
    return <MultiDropdown {...data} label="Exchange" />;
  });
