import React from 'react';
import Composer from 'react-composer';
import * as Tm from '@melonproject/token-math';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';

export const CapabilityContext = React.createContext({
  canInvest: false,
  canInteract: false,
});

export class CapabilityProvider extends React.PureComponent {
  render() {
    return (
      <Composer
        components={[
          <AccountConsumer />,
          <BalanceConsumer />,
          <NetworkConsumer />,
        ]}
      >
        {([account, balance, network]) => {
          const ethBalance = balance && balance.eth;
          const currentBlock = network && network.currentBlock;
          const nodeSynced = network && network.nodeSynced;

          const hasAccount = !!account;
          const hasEth =
            hasAccount && ethBalance && !Tm.isZero(ethBalance.quantity);
          const hasCurrentBlock = currentBlock && !Tm.isZero(currentBlock);
          const isSynced = !!nodeSynced;

          const canInteract =
            isSynced && hasAccount && hasCurrentBlock && hasEth;
          const canInvest = canInteract;

          return (
            <CapabilityContext.Provider
              value={{
                // TODO: Remove this?
                canInvest,
                canInteract,
              }}
            >
              {this.props.children}
            </CapabilityContext.Provider>
          );
        }}
      </Composer>
    );
  }
}

export const CapabilityConsumer = CapabilityContext.Consumer;
