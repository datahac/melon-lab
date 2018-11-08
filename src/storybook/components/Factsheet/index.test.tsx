import React from 'react';
import Factsheet from './index';

const mockCallbackShutdown = jest.fn();
const mockCallbackScrollTo = jest.fn();
const data = {
  gav: 0.9824,
  creationDate: '24. Jul 2018 09:19',
  priceFeedUp: false,
  isCompetition: false,
  loading: false,
  managementReward: 0.0,
  name: 'Melon Fund',
  numberOfFunds: '12',
  performanceReward: 0.0,
  personalStake: 1.0,
  quoteAsset: 'WETH-T',
  rank: '1',
  sharePrice: 0.9824,
  shutdown: mockCallbackShutdown,
  scrollTo: mockCallbackScrollTo,
  totalSupply: '1.0000',
  tweetHref: 'melonport',
  reportUrl: 'https://melon-reporting.now.sh/report/',
};

describe('Factsheet', () => {
  const defaultElement = <Factsheet {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with isCompetition', () => {
    wrapper.setProps({ isCompetition: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('scrollTo event', () => {
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(mockCallbackScrollTo.mock.calls.length).toBe(1);
    expect(mockCallbackScrollTo.mock.calls[0][0]).toEqual('holdings');
  });

  it('shutdown event', () => {
    wrapper
      .find('Button')
      .last()
      .simulate('click');
    expect(mockCallbackShutdown.mock.calls.length).toBe(1);
  });
});
