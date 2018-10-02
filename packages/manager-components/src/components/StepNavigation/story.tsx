import { storiesOf } from '@storybook/react';
import React from 'react';
import StepNavigation from './';

const data = {
  steps: [
    {
      name: 'Step 1',
      isCompleted: true,
    },
    {
      name: 'Step 2',
      isActive: true,
    },
    {
      name: 'Step 2',
    },
  ],
};

storiesOf('Components|Step Navigation', module).add('Default', () => {
  return <StepNavigation {...data} />;
});
