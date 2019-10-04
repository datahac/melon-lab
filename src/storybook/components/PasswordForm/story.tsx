import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import PasswordForm from './container';

const data = {
  initialValues: {
    password: '',
  },
  onCancel: action('onCancel'),
  onSubmit: action('onSubmit'),
};

storiesOf('Components|Password Form', module).add('Default', () => {
  return <PasswordForm {...data} />;
});
