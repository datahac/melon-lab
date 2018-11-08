import React from 'react';
import FundActivity from './index';

const data = {
  requestFullParticipationHistory: () => null,
};

describe('FundActivity', () => {
  const defaultElement = <FundActivity {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
