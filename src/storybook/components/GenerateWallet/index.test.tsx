import React from 'react';
import GenerateWallet from './index';

const data = {
  restore: () => null,
  mnemonic: 'lorem ipsum',
};

describe('GenerateWallet', () => {
  const defaultElement = <GenerateWallet {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
