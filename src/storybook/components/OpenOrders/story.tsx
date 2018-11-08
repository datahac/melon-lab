import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import OpenOrders from './index';

const data = {
  isManager: true,
  isReadyToTrade: true,
  orders: [
    {
      buyHowMuch: '2.1180',
      buySymbol: 'MLN-T',
      id: 12322,
      price: '0.0672',
      sellHowMuch: '0.1423',
      sellSymbol: 'WETH-T',
      timestamp: '25. Jul 2018 11:11',
      type: 'sell',
    },
    {
      buyHowMuch: '2.1180',
      buySymbol: 'MLN-T',
      id: 29468,
      price: '0.0672',
      sellHowMuch: '0.1423',
      sellSymbol: 'WETH-T',
      timestamp: '25. Jul 2018 11:11',
      type: 'sell',
    },
  ],
  onClick: action('onClick'),
};

storiesOf('Components|Open Orders', module).add('Default', () => {
  return <OpenOrders {...data} />;
});
