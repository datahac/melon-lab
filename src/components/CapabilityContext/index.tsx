import React from 'react';
import Composer from 'react-composer';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { isZero } from '@melonproject/token-math/bigInteger';

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
          const wethBalance = balance && balance.weth;
          const ethBalance = balance && balance.eth;
          const currentBlock = network && network.currentBlock;
          const nodeSynced = network && network.nodeSynced;

          const hasAccount = !!account;
          const hasEth =
            hasAccount && ethBalance && !isZero(ethBalance.quantity);
          const hasWeth =
            hasAccount && wethBalance && !isZero(wethBalance.quantity);
          const hasCurrentBlock = currentBlock && !isZero(currentBlock);
          const isSynced = !!nodeSynced;
          const isCompetition = false; // TODO: Make this configurable.

          const canInteract =
            isSynced && hasAccount && hasCurrentBlock && hasEth;
          const canInvest = isCompetition
            ? canInteract
            : canInteract && hasWeth;

          return (
            <CapabilityContext.Provider
              value={{
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
