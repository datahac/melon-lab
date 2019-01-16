import { storiesOf } from '@storybook/react';
import React from 'react';
import Policies from './index';
import Input from '~/blocks/Input';

const availablePolicies = {
  priceTolerance: {
    name: 'Price tolerance',
    Component: Input,
  },
};

const data = {
  availablePolicies,
  values: {
    riskProfile: {
      priceTolerance: {
        value: 0,
      },
    },
  },
};

storiesOf('Components|Policies', module).add('Default', () => {
  return <Policies {...data} />;
});
