import React from 'react';
import Composer from 'react-composer';
import GetStarted from '~/components/GetStarted';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import { isZero } from '~/utils/functionalBigNumber';

const getLink = (account, weth, fund) => {
  if (account) {
    if (weth && !isZero(weth)) {
      return {
        href: '/wallet',
        text: 'Fund your wallet',
      };
    }

    if (fund) {
      return {
        query: { address: fund },
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
    text: 'Setup your fund',
  };
};

export default class GetStartedContainer extends React.PureComponent {
  render() {
    return (
      <Composer
        components={[
          <AccountConsumer />,
          <BalanceConsumer />,
          <FundManagerConsumer />,
        ]}>
        {([account, balance, fund]) => {
          const link = getLink(account, balance && balance.weth, fund);

          return (
            <GetStarted link={link} {...this.props} />
          );
        }}
      </Composer>
    );
  }
}
