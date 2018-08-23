import { storiesOf } from '@storybook/react';
import React from 'react';
import Checkbox from './index';

const data = {
  name: 'name',
  value: 'value',
  text: 'Text',
};

storiesOf('Blocks|Checkbox', module)
  .add('Default', () => {
    return <Checkbox {...data} />;
  })
  .add('Disabled', () => {
    return <Checkbox {...data} disabled={true} />;
  })
  .add('Checked', () => {
    return <Checkbox {...data} defaultChecked={true} />;
  });
