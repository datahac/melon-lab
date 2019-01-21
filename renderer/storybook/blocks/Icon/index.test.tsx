import React from 'react';
import Icon from './index';

const data = {
  name: 'logos_default',
  iconClass: 'iconClass',
};

describe('Icon', () => {
  const defaultElement = <Icon {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with width', () => {
    wrapper.setProps({ width: '1px' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with height', () => {
    wrapper.setProps({ height: '1px' });
    expect(wrapper).toMatchSnapshot();
  });
});
