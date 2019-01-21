import React from 'react';
import LockedWallet from './index';

describe('LockedWallet', () => {
  const defaultElement = <LockedWallet />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
