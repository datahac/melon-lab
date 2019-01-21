import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Input from './index';

const data = {
  name: 'input',
  type: 'text',
};

storiesOf('Blocks|Input', module)
  .add('Default', () => {
    return <Input {...data} onChange={action('changed')} />;
  })
  .add('Disabled', () => {
    return <Input {...data} disabled={true} />;
  })
  .add('With placeholder', () => {
    return <Input {...data} placeholder="Placeholder..." />;
  })
  .add('With label', () => {
    return <Input {...data} placeholder="Placeholder..." label="Label" />;
  })
  .add('With inside label', () => {
    return (
      <Input {...data} placeholder="0.000" label="Label" insideLabel={true} />
    );
  });
