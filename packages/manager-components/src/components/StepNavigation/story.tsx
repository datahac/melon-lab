import { storiesOf } from '@storybook/react';
import React from 'react';
import StepNavigation from './';

const data = {
  steps: [
    {
      value: 'Step 1',
      isCompleted: true,
    },
    {
      value: 'Step 2',
      isActive: true,
    },
    {
      value: 'Step 2',
    },
  ],
};

storiesOf('Components|Step Navigation', module).add('Default', () => {
  return <StepNavigation {...data} />;
});
