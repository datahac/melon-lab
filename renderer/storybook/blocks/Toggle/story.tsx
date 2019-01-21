import { storiesOf } from '@storybook/react';
import React from 'react';
import Toggle from './index';

const data = {
  name: 'name',
  value: 'value',
  text: 'text',
  onChange: () => null,
};

storiesOf('Blocks|Toggle', module)
  .add('Default', () => {
    return <Toggle {...data} />;
  })
  .add('Is checked', () => {
    return <Toggle {...data} isChecked={true} />;
  });
