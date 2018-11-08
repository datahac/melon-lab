import React from 'react';
import Statistics from './index';

const data = {
  rewardsSum: '0',
  investmentsSum: '0',
  redeemalsSum: '0',
  tradesCount: '0',
  highestSharePrice: '0',
  netAssetValue: '0',
};

describe('Statistics', () => {
  const defaultElement = <Statistics {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
