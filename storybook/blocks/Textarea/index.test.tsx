import React from 'react';
import Textarea from './index';

describe('Textarea', () => {
  const defaultElement = <Textarea />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
