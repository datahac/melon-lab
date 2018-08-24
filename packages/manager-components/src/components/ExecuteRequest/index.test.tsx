import React from 'react';
import ExecuteRequest from './index';

const mockCallback = jest.fn();
const data = {
  onExecute: mockCallback,
  readyToExecute: true,
  requestId: 1,
};

describe('ExecuteRequest', () => {
  const defaultElement = <ExecuteRequest {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('onExecute event', () => {
    const wrapper = shallow(defaultElement);
    wrapper.find('Button').simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toEqual(data.requestId);
  });
});
