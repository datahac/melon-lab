import React from 'react';
import ImportWallet from './index';

const data = {
  parseWallet: () => null,
  goToAccount: () => null,
};

describe('ImportWallet', () => {
  const defaultElement = <ImportWallet {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
