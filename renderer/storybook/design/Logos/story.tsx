import { storiesOf } from '@storybook/react';
import React from 'react';
import Logo from './index';

storiesOf('Design|Logos', module).add('Default', () => (
  <Logo width={100} height={120} name="default" />
));
