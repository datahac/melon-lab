import React from 'react';
import Spinner from './index';

const data = {
  icon: true,
};

describe('Spinner', () => {
  const defaultElement = <Spinner {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
