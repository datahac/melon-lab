import React from 'react';
import Administration from './index';

const data = {
  toggleSubscription: () => null,
  convertUnclaimedRewards: () => null,
  shutdown: () => null,
  quoteAsset: 'MLN',
};

describe('Administration', () => {
  const defaultElement = <Administration {...data} />;
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

  it('should render correctly with subscriptionAllowed', () => {
    wrapper.setProps({ subscriptionAllowed: true });
    expect(wrapper).toMatchSnapshot();
  });
});
