import React from 'react';
import OrderForm from './container';

const data = {
  baseTokenSymbol: 'ETH-T-M',
  quoteTokenSymbol: 'MLN-T-M',
  strategy: 'Limit',
  info: {
    lastPrice: 0.5,
    bid: 0,
    ask: 0,
    tokens: {
      baseToken: {
        name: 'ETH-T',
        balance: 30,
      },
      quoteToken: {
        name: 'MLN-T',
        balance: 20,
      },
    },
  },
  exchanges: [
    { value: 'RadarRelay', name: 'Radar Relay' },
    { value: 'OasisDEX', name: 'OasisDEX' },
  ],
  selectedExchange: 'RadarRelay',
  selectedOrderType: 'Buy',
  decimals: 6,
  priceFeedUp: true,
  total: '',
};

describe('OrderForm', () => {
  const defaultElement = <OrderForm {...data} />;
  let tree;

  beforeEach(() => {
    tree = mount(defaultElement);
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
