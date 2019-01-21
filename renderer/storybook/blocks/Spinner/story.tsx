import { storiesOf } from '@storybook/react';
import React from 'react';
import Spinner from './index';

storiesOf('Blocks|Spinner', module)
  .add('Default', () => {
    return <Spinner icon />;
  })
  .add('Small', () => {
    return <Spinner icon size="small" />;
  })
  .add('without Icon', () => {
    return <Spinner size="inflated" />;
  });
