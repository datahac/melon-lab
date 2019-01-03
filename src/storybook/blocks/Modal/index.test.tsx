import React from 'react';
import Modal from './index';
import Button from '~/blocks/Button';

const mockCallback = jest.fn();
const data = {
  isOpen: true,
  title: 'Modal',
  PrimaryAction: Button,
  PrimaryActionProps: {
    children: 'First Button',
    onClick: mockCallback,
    style: 'secondary',
  },
  SecondaryAction: Button,
  SecondaryActionProps: {
    children: 'Second Button',
    onClick: mockCallback,
  },
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
  });

  it('onClick primary action', () => {
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(mockCallback.mock.calls.length).toBe(2);

  });
});
