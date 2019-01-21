import { storiesOf } from '@storybook/react';
import React from 'react';
import Loading from './index';

storiesOf('Blocks|Loading', module).add('Default', () => {
  return <Loading />;
});
