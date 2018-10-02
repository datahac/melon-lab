import React from 'react';
import GetStarted from './index';

const mockCallback = jest.fn();
const data = {
  linkCaption: 'Setup your fund',
  networkId: '42',
  onClick: mockCallback,
  linkAction: {
    payload: { address: 'address' },
    type: 'type',
  },
};

describe('GetStarted', () => {
  const defaultElement = <GetStarted {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with isHome', () => {
    wrapper.setProps({ isHome: true });
    expect(wrapper).toMatchSnapshot();
  });
});
