import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import FeeForm from './index';

const data = {
  values: {
    gasPrice: 2000000000,
  },
  touched: {
    gasPrice: null,
  },
  errors: {
    gasPrice: null,
  },
  gasLimit: 30000,
  handleSubmit: action('handleSubmit'),
  handleChange: action('handleChange'),
  handleBlur: action('handleBlur'),
  onCancel: action('onCancel'),
};

storiesOf('Components|Fee Form', module).add('Default', () => {
  return <FeeForm {...data} />;
});
