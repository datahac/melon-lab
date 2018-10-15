import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import FeeForm from './index';

const data = {
  initialValues: {
    gasPrice: '20.000',
  },
  fees: [
    {
      description: 'Estimated max gas cost',
      gasLimit: 30000,
      gasPrice: '20',
      gasTotal: '0.0006',
    },
    {
      description: 'Estimated max gas cost',
      gasLimit: 30000,
      gasPrice: '20',
      gasTotal: '0.0006',
    },
  ],
  onSubmit: action('onSubmit'),
  onCancel: action('onCancel'),
};

storiesOf('Components|Fees Form', module).add('Default', () => {
  return <FeeForm {...data} />;
});
