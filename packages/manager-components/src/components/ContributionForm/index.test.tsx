import React from 'react';
import ContributionForm from './container';

const data = {
  initialValues: {
    amount: '',
    total: '',
  },
  priceFeedUp: true,
  melonAssetSymbol: 'MLN',
};

describe('ContributionForm', () => {
  const defaultElement = <ContributionForm {...data} />;
  let tree;

  beforeEach(() => {
    tree = mount(defaultElement);
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when price feed down', () => {
    tree.setProps({ priceFeedUp: false });
    expect(tree).toMatchSnapshot();
  });
});
