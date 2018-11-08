import React from 'react';
import CompetitionRegistration from './index';

const data = {
  skipRegistration: () => null,
  continueToSignCompetitionTerms: () => null,
  sign: () => null,
  isRegistered: () => null,
  fundAddress: 'foo',
  managerAddress: 'foo',
  showedRegistration: true,
  competitionSignature: false,
  r: 'foo',
  s: 'foo',
  v: 'foo',
};

describe('CompetitionRegistration', () => {
  const defaultElement = <CompetitionRegistration {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly without showedRegistration', () => {
    wrapper.setProps({ showedRegistration: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick pursue registration event', () => {
    global.open = jest.fn();
    wrapper.setProps({ competitionSignature: true });
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(global.open).toBeCalled();
  });
});
