import React from 'react';
import ClaimReward from './index';

const mockCallbackClaimReward = jest.fn();
const mockCallbackRedeemParosShares = jest.fn();
const data = {
  competitionName: 'Naxos',
  claimReward: mockCallbackClaimReward,
  isCompetitionActive: false,
  endTime: 'Tomorrow',
  redeemParosShares: mockCallbackRedeemParosShares,
};

describe('ClaimReward', () => {
  const defaultElement = <ClaimReward {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly with isCompetitionActive', () => {
    wrapper.setProps({ isCompetitionActive: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick claimReward event', () => {
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(mockCallbackClaimReward.mock.calls.length).toBe(1);
  });

  it('onClick redeemParosShares event', () => {
    wrapper
      .find('Button')
      .last()
      .simulate('click');
    expect(mockCallbackRedeemParosShares.mock.calls.length).toBe(1);
  });
});
