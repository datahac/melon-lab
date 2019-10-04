import React from 'react';
import StepNavigation from './index';

const data = {
  restore: () => null,
  mnemonic: 'lorem ipsum',
};

describe('StepNavigation', () => {
  const defaultElement = <StepNavigation {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
