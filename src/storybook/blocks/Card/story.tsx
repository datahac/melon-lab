import { storiesOf } from '@storybook/react';
import React from 'react';
import Card from './index';

const data = {
  name: 'Black Turtle',
  address: '0x5bBA9263Ab1eA26FF9c0FeE3619e7AAf7C79E02b',
  inception: '26. Jul 2018 10:48',
  sharePrice: '1.0081',
  rank: 1,
};

storiesOf('Blocks|Card', module).add('Default', () => {
  return <Card {...data} />;
});
