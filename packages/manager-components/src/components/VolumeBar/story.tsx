import { storiesOf } from '@storybook/react';
import React from 'react';
import VolumeBar from './index';

const data = {
  widthBar: '80.858395989974937364%',
  leftSpaceBorder: 'calc(80.858395989974937364% - 9.732664995822890545% - 1px)',
  widthBorder: '9.732664995822890545%',
  style: 'sell',
};

storiesOf('Components|Volume Bar', module).add('Default', () => {
  return <VolumeBar {...data} />;
});
