import React from 'react';
import OpenOrders from './index';

const mockCallback = jest.fn();
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
  onClick: mockCallback,
};

describe('OpenOrders', () => {
  const defaultElement = <OpenOrders {...data} />;
  let customElement;

  it('should render correctly without orders', () => {
    customElement = <OpenOrders {...data} orders={[]} />;
    const wrapper = shallow(customElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick cancel event', () => {
    const wrapper = shallow(defaultElement);
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toEqual(data.orders[0].id);
  });
});
