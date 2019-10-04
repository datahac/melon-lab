import { storiesOf } from '@storybook/react';
import React from 'react';
import OrderForm from './index';
import { data as OrderInfoData } from '~/components/OrderInfo/story';

const data = {
  ...OrderInfoData,
  baseAsset: 'ETH-M',
  quoteAsset: 'MLN-M',
  selectedOrder: false,
  isManager: true,
  exchanges: [{ value: 'RADAR_RELAY', name: 'Radar Relay' }, { value: 'OASIS_DEX', name: 'OasisDEX' }],
  values: {
    price: {
      base: {
        quantity: 1000000000000000000,
        token: {
          symbol: 'ETH',
          decimals: 18,
        },
      },
      quote: {
        quantity: 1000000000000000000,
        token: {
          symbol: 'ETH',
          decimals: 18,
        },
      },
    },
    orderType: 'Sell',
    strategy: 'Limit',
    quantity: {
      quantity: 3000000000000000000,
      token: {
        symbol: 'ETH',
        decimals: 18,
      },
    },
    total: {
      quantity: 3000000000000000000,
      token: {
        symbol: 'ETH',
        decimals: 18,
      },
    },
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
