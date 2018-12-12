import { storiesOf } from '@storybook/react';
import React from 'react';
import OrderForm from './index';

const data = {
  baseAsset: 'ETH-M',
  quoteAsset: 'MLN-M',
  selectedOrder: false,
  isManager: true,
  info: {
    lastPrice: 0.5,
    bid: 0,
    ask: 0,
  },
  tokens: {
    baseToken: {
      name: 'ETH',
      balance: 30.0,
    },
    quoteToken: {
      name: 'MLN',
      balance: 20.0,
    },
  },
  exchanges: [
    { value: 'RADAR_RELAY', name: 'Radar Relay' },
    { value: 'OASIS_DEX', name: 'OasisDEX' },
  ],
  values: {
    price: '1.0000',
    orderType: 'Sell',
    strategy: 'Limit',
    quantity: '1.0000',
    total: '1.0000',
    exchange: 'OASIS_DEX',
  },
  touched: {
    price: null,
    orderType: null,
    strategy: null,
    quantity: null,
    total: null,
    exchange: null,
  },
  error: {
    price: null,
    orderType: null,
    strategy: null,
    quantity: null,
    total: null,
    exchange: null,
  },
  selectedExchange: 'RadarRelay',
  selectedOrderType: 'Buy',
  decimals: 4,
  priceFeedUp: true,
};

storiesOf('Components|Order Form', module).add('Default', () => {
  return <OrderForm {...data} />;
});
