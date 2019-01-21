import { storiesOf } from '@storybook/react';
import React from 'react';
import Navigation from './index';

const data = {
  navigationItems: [
    {
      name: 'Overview',
      href: '/wallet/overview',
    },
    {
      name: 'Settings',
      href: '/wallet/settings',
    },
  ],
};

storiesOf('Components|Naviagtion', module).add('Default', () => {
  return <Navigation {...data} />;
});
