import React from 'react';
import Button from './index';

const mockCallback = jest.fn();
const data = {
  onClick: mockCallback,
};

describe('Button', () => {
  const defaultElement = <Button {...data}>Default button</Button>;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick event', () => {
    wrapper.find('button').simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
