import React from 'react';
import Account from './index';

const data = {
  currentAddress: '0x270c65cb31d037E4269dC8F736350FDc8ED07353',
  associatedFund: '0x0890b03f83629B397F6E5E5075400fe6Ddb4255F',
  networkId: '42',
  isCompetition: false,
  deleteWallet: () => null,
};

describe('Account', () => {
  const defaultElement = <Account {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly without currentAddress', () => {
    wrapper.setProps({ currentAddress: undefined });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly without associatedFund', () => {
    wrapper.setProps({ associatedFund: undefined });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly without networkId', () => {
    wrapper.setProps({ networkId: undefined });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
