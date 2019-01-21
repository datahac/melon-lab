import React from 'react';
import WrongNetwork from './index';

describe('WrongNetwork', () => {
  const defaultElement = <WrongNetwork />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
