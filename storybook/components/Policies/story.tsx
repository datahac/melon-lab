import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import Policies from './index';
import Input from '~/blocks/Input';

const availablePolicies = {
  priceTolerance: {
    name: 'Price tolerance',
    desc: 'The higher the tolerance, the greater the risk',
    Component: Input,
    unit: '%',
  },
};

const data = {
  onActivatePolicy: action('onActivatePolicy'),
  availablePolicies,
  values: {
    policies: {
      riskProfile: 0,
    },
  },
};

storiesOf('Components|Policies', module).add('Default', () => {
  return <Policies {...data} />;
});
