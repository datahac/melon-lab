import { storiesOf } from '@storybook/react';
import React from 'react';
import Policies from './index';
import PolicySlider from '~/components/PolicySlider';

const data = {
  policies: [
    {
      name: 'Max positions 1',
      Component: PolicySlider,
    },
    {
      name: 'Max positions 2',
      Component: PolicySlider,
    },
    {
      name: 'Max positions 3',
      Component: PolicySlider,
    },
    {
      name: 'Max positions 4',
      Component: PolicySlider,
    },
  ],
  activatedPolicies: [
    {
      name: 'Max positions 5',
      Component: PolicySlider,
      ComponentProps: {
        defaultValue: '10',
        value: 10,
        description: 'The higher the tolerance, the greate the risk',
      },
    },
    {
      name: 'Max positions 6',
      Component: PolicySlider,
      ComponentProps: {
        defaultValue: '10',
        value: 10,
        description: 'The higher the tolerance, the greate the risk',
      },
    },
    {
      name: 'Max positions 7',
      Component: PolicySlider,
      ComponentProps: {
        defaultValue: '10',
        value: 10,
        description: 'The higher the tolerance, the greate the risk',
      },
    },
  ],
};

storiesOf('Components|Policies', module).add('Default', () => {
  return <Policies {...data} />;
});
