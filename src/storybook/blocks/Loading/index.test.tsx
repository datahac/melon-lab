import React from 'react';
import Loading from './index';

describe('Loading', () => {
  const defaultElement = <Loading />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly without loading', () => {
    wrapper.setProps({ loading: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly without dataAvailable', () => {
    wrapper.setProps({ loading: false, dataAvailable: false });
    expect(wrapper).toMatchSnapshot();
  });
});
