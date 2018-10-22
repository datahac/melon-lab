import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Wizard from './';

const data = {
  initialValues: {
    test: '20.000',
  },
  onSubmit: action('onSubmit'),
  onCancel: action('onCancel'),
};

storiesOf('Components|Wizard', module).add('Default', () => {
  return <Wizard {...data} />;
});
