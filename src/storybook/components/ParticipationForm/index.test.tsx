import React from 'react';
import Form from './';
import ParticipationForm from './container';

const onSubmit = jest.fn();

const data = {
  initialValues: {
    price: 1.0,
    type: 'Slices',
  },
  decimals: 4,
  setup: true,
  priceFeedUp: true,
  quoteAsset: 'WETH-T',
  fund: {
    sharePrice: 5,
  },
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
