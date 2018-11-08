import React from 'react';
import Switch from './index';

const mockCallback = jest.fn();
const data = {
  options: ['ETH-T-M', 'MLN-T-M'],
  labels: ['Buy', 'Sell'],
  name: 'name',
  value: 'value',
  onChange: mockCallback,
};

describe('Switch', () => {
  const defaultElement = <Switch {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('onChange event', () => {
    wrapper
      .find('.switch__input')
      .simulate('change', { target: { checked: true } });
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0].target.value).toBe(data.labels[1]);
    wrapper
      .find('.switch__input')
      .simulate('change', { target: { checked: false } });
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[1][0].target.value).toBe(data.labels[0]);
  });
});
