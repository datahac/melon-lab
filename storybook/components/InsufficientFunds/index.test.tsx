import React from 'react';
import InsufficientFunds from './index';

const data = {
  eth: 0,
  address: '0x12312451234123123',
};

describe('Setup', () => {
  const defaultElement = <InsufficientFunds {...data} />;
  let tree;

  beforeEach(() => {
    tree = mount(defaultElement);
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
