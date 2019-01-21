import { storiesOf } from '@storybook/react';
import React from 'react';
import OlympiadPlaceholder from './index';

const data = {};

storiesOf('Components|Olympiad Placeholder', module).add('Default', () => {
  return <OlympiadPlaceholder {...data} />;
});
