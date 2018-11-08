import React from 'react';
import Modal from './index';

const mockCallback = jest.fn();
const data = {
  isOpen: true,
  loading: false,
  title: 'Modal',
  primaryInteraction: 'primaryInteraction',
  interactionHandler: mockCallback,
};

describe('Modal', () => {
  const defaultElement = <Modal {...data}>Hello World</Modal>;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick primary action', () => {
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][1]).toBe(data.primaryInteraction);
  });

  it('onClick primary action', () => {
    wrapper.setProps({ secondaryInteraction: 'secondaryInteraction' });
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[1][1]).toBe('secondaryInteraction');
  });
});
