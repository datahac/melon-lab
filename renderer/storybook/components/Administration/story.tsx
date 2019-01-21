import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Administration from './index';

const data = {
  toggleSubscription: action('clicked toggleSubscription'),
  convertUnclaimedRewards: action('clicked convertUnclaimedRewards'),
  shutdown: action('clicked shutdown'),
  quoteAsset: 'MLN',
};

storiesOf('Components|Administration', module).add('Default', () => {
  return <Administration {...data} />;
});
