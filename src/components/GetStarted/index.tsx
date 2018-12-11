import React from 'react';
import Composer from 'react-composer';
import GetStarted from '~/components/GetStarted';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import * as tokenMath from '@melonproject/token-math';

const getLink = (account, weth, fund) => {
  if (account) {
    if (weth && tokenMath.bigInteger.isZero(weth.quantity)) {
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
        ]}
      >
        {([account, balance, managerProps]) => {
          const link = getLink(
            account,
            balance && balance.weth,
            managerProps.fund,
          );

          return <GetStarted link={link} {...this.props} />;
        }}
      </Composer>
    );
  }
}
