import React from 'react';
import TermsAndConditions from './index';

const data = {
  networkId: '1',
  sign: () => null,
};

describe('TermsAndConditions', () => {
  const defaultElement = <TermsAndConditions {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly without networkId', () => {
    wrapper.setProps({ networkId: undefined });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
