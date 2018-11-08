import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from './index';

const data = {
  onClick: action('clicked'),
};

storiesOf('Blocks|Button', module)
  .add('Default', () => {
    return <Button {...data}>Default button</Button>;
  })
  .add('Secondary', () => {
    return (
      <Button {...data} style="secondary">
        Secondary button
      </Button>
    );
  })
  .add('Disabled', () => {
    return (
      <Button {...data} disabled={true}>
        Disabled button
      </Button>
    );
  })
  .add('Small', () => {
    return (
      <Button {...data} size="small">
        Small button
      </Button>
    );
  })
  .add('Large', () => {
    return (
      <Button {...data} size="large">
        Large button
      </Button>
    );
  })
  .add('Warning', () => {
    return (
      <Button {...data} style="warning">
        Warning button
      </Button>
    );
  })
  .add('Danger', () => {
    return (
      <Button {...data} style="danger">
        Danger button
      </Button>
    );
  })
  .add('Success', () => {
    return (
      <Button {...data} style="success">
        Success button
      </Button>
    );
  });
