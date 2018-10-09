import React from 'react';
import { compose, withPropsOnChange } from 'recompose';
import GetStarted from '~/components/GetStarted';

const getLink = props => {
  if (props.account) {
    if (props.balances && props.balances.weth) {
      return {
        href: '/wallet',
        text: 'Fund your wallet',
      };
    }

    if (props.associatedFund) {
      return {
        query: {
          address: props.associatedFund.address
        },
        href: '/manage',
        text: 'Go to your fund',
      };
    }

    return {
      href: '/setup',
      text: 'Setup your fund',
    };
  }

  return {
    href: '/wallet',
    text: 'Create a wallet',
  };
};

const withMappedProps = withPropsOnChange(['account', 'balances'], props => ({
  link: getLink(props),
}));

const withGetStarted = BaseComponent => baseProps => (
  <BaseComponent {...baseProps} />
);

export default compose(
  withGetStarted,
  withMappedProps,
)(GetStarted);
