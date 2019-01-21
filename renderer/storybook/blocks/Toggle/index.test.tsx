import React from 'react';
import Toggle from './index';

const mockCallback = jest.fn();
const data = {
  name: 'name',
  value: 'value',
  text: 'text',
  onChange: mockCallback,
};

describe('Toggle', () => {
  const defaultElement = <Toggle {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('onChange event', () => {
    wrapper
      .find('.toggle__input')
      .simulate('change', { target: { checked: true, value: data.value } });
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0].target.value).toBe(data.value);
    wrapper
      .find('.toggle__input')
      .simulate('change', { target: { checked: true, value: data.value } });
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[1][0].target.value).toBe(data.value);
  });
});
