import { storiesOf } from '@storybook/react';
import React from 'react';
import RadioButton from './index';

const data = {
  name: 'name',
  value: 'value',
  text: 'Text',
};

storiesOf('Blocks|Radio Button', module)
  .add('Default', () => {
    return <RadioButton {...data} />;
  })
  .add('Disabled', () => {
    return <RadioButton {...data} disabled={true} />;
  })
  .add('Checked', () => {
    return <RadioButton {...data} defaultChecked={true} />;
  });
