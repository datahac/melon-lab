import React from 'react';
import InsufficientEth from './index';

const data = {
  eth: 0,
  address: '0x12312451234123123',
};

describe('Setup', () => {
  const defaultElement = <InsufficientEth {...data} />;
  let tree;

  beforeEach(() => {
    tree = mount(defaultElement);
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
