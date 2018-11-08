import React from 'react';
import Input from './index';

const mockCallback = jest.fn();
const data = {
  name: 'name',
  type: 'text',
  label: 'label',
};

describe('Input', () => {
  const defaultElement = <Input {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with number', () => {
    wrapper.setProps({ formatNumber: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('onChange event', () => {
    wrapper.setProps({ onChange: mockCallback });
    wrapper
      .find('.input__field')
      .simulate('change', { target: { value: 'test' } });
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0].target.value).toBe('test');
  });

  it('onChange event', () => {
    wrapper.setProps({ onChange: mockCallback, formatNumber: true });
    wrapper
      .find('.input__field')
      .simulate('change', { target: { value: 'test' } });
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[1][0].target.value).toBe('test');
  });
});
