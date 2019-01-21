import React from 'react';
import Footer from './index';

describe('Footer', () => {
  const defaultElement = <Footer />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
