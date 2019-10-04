import React from 'react';
import NoConnection from './index';

describe('NoConnection', () => {
  const defaultElement = <NoConnection />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
