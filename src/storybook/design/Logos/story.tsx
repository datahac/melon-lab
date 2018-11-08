import { storiesOf } from '@storybook/react';
import React from 'react';
import { LogoDefault, LogoWithBottomText, LogoWithText } from './index';

storiesOf('Design|Logos', module)
  .add('Default', () => <LogoDefault />)
  .add('With text', () => <LogoWithText />)
  .add('With bottom text', () => <LogoWithBottomText />);
