import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Textarea from './index';

storiesOf('Blocks|Textarea', module).add('Default', () => {
  return <Textarea name="textarea" onChange={action('onChange')} />;
});
