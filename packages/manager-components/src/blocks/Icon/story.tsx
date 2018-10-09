import { storiesOf } from '@storybook/react';
import React from 'react';
import Icon from './index';

const data = {
  name: 'logos_default',
};

storiesOf('Blocks|Icon', module)
  .add('Logo', () => {
    return <Icon {...data} />;
  })
  .add('Wallet', () => {
    return <Icon name="icons_wallet" />;
  })
  .add('Twitter', () => {
    return <Icon name="icons_twitter" />;
  });
