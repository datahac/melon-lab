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
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly without orders', () => {
    wrapper.setProps({ orders: [] });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick cancel event', () => {
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toEqual(data.orders[0].id);
  });
});
