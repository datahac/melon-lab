import React from 'react';
import Holdings from './index';

const mockCallback = jest.fn();
const data = {
  isReadyToTrade: true,
  priceFeedUp: true,
  quoteAsset: 'WETH',
  onClick: mockCallback,
  holdings: [
    { symbol: 'ANT-T', balance: '0.0000', price: '0.0035', fraction: '0.0000' },
    { symbol: 'BAT-T', balance: '0.0000', price: '0.0007', fraction: '0.0000' },
    { symbol: 'DGD-T', balance: '0.0000', price: '0.0000', fraction: '0.0000' },
    { symbol: 'DGX-T', balance: '0.0000', price: '0.0000', fraction: '0.0000' },
    { symbol: 'GNO-T', balance: '0.0000', price: '0.1113', fraction: '0.0000' },
    { symbol: 'REP-T', balance: '0.0000', price: '0.0648', fraction: '0.0000' },
    { symbol: 'ZRX-T', balance: '0.0000', price: '0.0024', fraction: '0.0000' },
    { symbol: 'REQ-T', balance: '0.0000', price: '0.0001', fraction: '0.0000' },
    {
      symbol: 'WETH',
      balance: '0.5166',
      price: '1.0000',
      fraction: '50.5764',
    },
    {
      symbol: 'MLN',
      balance: '10.7338',
      price: '0.0470',
      fraction: '49.4236',
    },
    { symbol: 'MKR-T', balance: '0.0000', price: '1.3430', fraction: '0.0000' },
    { symbol: 'DAI-T', balance: '0.0000', price: '0.0021', fraction: '0.0000' },
    { symbol: 'KNC-T', balance: '0.0000', price: '0.0276', fraction: '0.0000' },
    { symbol: 'JNT-T', balance: '0.0000', price: '0.0003', fraction: '0.0000' },
    { symbol: 'OMG-T', balance: '0.0000', price: '0.0150', fraction: '0.0000' },
    { symbol: 'NMR-T', balance: '0.0000', price: '0.0184', fraction: '0.0000' },
  ],
};

describe('Holdings', () => {
  const defaultElement = <Holdings {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly without price feed', () => {
    wrapper.setProps({ priceFeedUp: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick event', () => {
    wrapper
      .find('Button')
      .last()
      .simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toEqual(data.holdings[15]);
  });
});
