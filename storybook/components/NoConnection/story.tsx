import { storiesOf } from '@storybook/react';
import React from 'react';
import NoConnection from './index';

storiesOf('Components|No Connection', module).add('Default', () => {
  return <NoConnection />;
});
