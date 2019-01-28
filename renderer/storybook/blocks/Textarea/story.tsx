import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Form from './index';

storiesOf('Blocks|Form', module).add('Default', () => {
  return <Form onSubmit={action('submit')} />;
});
