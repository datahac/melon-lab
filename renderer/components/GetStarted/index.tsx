import React from 'react';
import Composer from 'react-composer';
import GetStarted from '~/components/GetStarted';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import { SetupConsumer } from '+/components/SetupContext';
import * as Tm from '@melonproject/token-math';

const getLink = (account, eth, fund, isComplete) => {
  if (account) {
    if (eth && Tm.isZero(eth.quantity)) {
      return {
        href: '/wallet',
        text: 'Fund your wallet',
      };
    }

    if (fund && isComplete) {
      return {
        query: { address: fund },
        href: '/manage',
        text: 'Go to your fund',
      };
    }

    if (fund && !isComplete) {
      return {
        query: { address: fund },
        href: '/setup',
        text: 'Continue setup your fund',
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

const GetStartedContainer = ({ ...props }) => (
  <Composer
    components={[
      <AccountConsumer />,
      <BalanceConsumer />,
      <FundManagerConsumer />,
      <SetupConsumer />,
    ]}
  >
    {([account, balance, managerProps, setupProps]) => {
      const link = getLink(
        account,
        balance.eth,
        managerProps.fund,
        setupProps.isComplete,
      );

      return <GetStarted link={link} {...props} />;
    }}
  </Composer>
);

export default GetStartedContainer;
