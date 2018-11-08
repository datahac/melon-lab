import { storiesOf } from '@storybook/react';
import React from 'react';
import WrongNetwork from './index';

storiesOf('Components|Wrong Network', module).add('Default', () => {
  return <WrongNetwork />;
});
