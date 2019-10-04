import { storiesOf } from '@storybook/react';
import React from 'react';
import Icons from './index';

storiesOf('Design|Icons', module)
  .add('Twitter', () => <Icons name="twitter" width="100" height="100" />)
  .add('Cross', () => <Icons name="cross" width="100" height="100" />);
