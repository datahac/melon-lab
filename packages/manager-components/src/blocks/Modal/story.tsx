import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import Modal from './index';
import Button from '~/blocks/Button';

const data = {
  isOpen: true,
  title: 'Modal',
  PrimaryAction: Button,
  PrimaryActionProps: {
    children: 'First Button',
    onClick: action('First button clicked'),
    style: 'secondary'
  },
  SecondaryAction: Button,
  SecondaryActionProps: {
    children: 'Second Button',
    onClick: action('Second button clicked'),
  },
};

storiesOf('Blocks|Modal', module).add('Default', () => {
  return <Modal {...data} />;
});
