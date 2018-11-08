import React from 'react';
import OrderInfo from './index';

const data = {
  tokens: {
    baseToken: {
      name: 'ETH-T',
      balance: 30.0,
    },
    quoteToken: {
      name: 'MLN-T',
      balance: 20.0,
    },
  },
};

describe('Order Info', () => {
  const defaultElement = <OrderInfo {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with lastPrice', () => {
    wrapper.setProps({ lastPrice: 0.5 });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with bid', () => {
    wrapper.setProps({ bid: 0.5 });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with ask', () => {
    wrapper.setProps({ ask: 0.5 });
    expect(wrapper).toMatchSnapshot();
  });
});
