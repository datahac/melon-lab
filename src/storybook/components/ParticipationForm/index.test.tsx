import React from 'react';
import ParticipationForm from './';

const data = {
  values: {
    price: 1,
    type: 'Invest',
    quantity: 1,
    total: 1,
  },
  errors: {},
  touched: {},
  decimals: 4,
  setup: true,
  quoteAsset: 'WETH',
};

describe('ParticipationForm', () => {
  const defaultElement = <ParticipationForm {...data} />;
  let tree;

  beforeEach(() => {
    tree = mount(defaultElement);
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
