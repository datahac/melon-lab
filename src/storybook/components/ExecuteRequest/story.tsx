import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import ExecuteRequest from './index';

const data = {
  onExecute: action('onExecute'),
  requestId: 1,
};

storiesOf('Components|Execute Request', module)
  .add('Default', () => {
    return <ExecuteRequest {...data} readyToExecute={true} />;
  })
  .add('No ready', () => {
    return <ExecuteRequest {...data} />;
  });
