import React from 'react';
import Header from './index';

const mockCallbackHome = jest.fn();
const mockCallbackWallet = jest.fn();
const data = {
  balances: {
    eth: 1.23422234,
  },
  account: {
    address: '0xa80B…d46f',
  },
  network: 'kovan',
  goToHome: mockCallbackHome,
  goToWallet: mockCallbackWallet,
  status: {
    message: 'message',
    type: 'type',
  },
};

describe('Header', () => {
  const defaultElement = <Header {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with status', () => {
    wrapper.setProps({ status: { link: 'link' } });
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick go to home event', () => {
    wrapper.find('.header__logo a').simulate('click', {
      // tslint:disable-next-line
      preventDefault: () => {},
    });
    expect(mockCallbackHome.mock.calls.length).toBe(1);
  });

  it('onClick go to wallet event', () => {
    wrapper.find('.header__account-address a').simulate('click', {
      // tslint:disable-next-line
      preventDefault: () => {},
    });
    expect(mockCallbackWallet.mock.calls.length).toBe(1);
  });
});
