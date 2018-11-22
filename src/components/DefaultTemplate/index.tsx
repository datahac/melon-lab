import React from 'react';
import Composer from 'react-composer';
import DefaultTemplate from '~/templates/DefaultTemplate';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { CapabilityConsumer } from '+/components/CapabilityContext';
import { ConfigurationConsumer } from '+/components/ConfigurationContext';

export default class DefaultTemplateContainer extends React.PureComponent {
  render() {
    return (
      <Composer
        components={[
          <AccountConsumer />,
          <BalanceConsumer />,
          <NetworkConsumer />,
          <CapabilityConsumer />,
          <ConfigurationConsumer />,
        ]}
      >
        {([account, balances, network, capabibility, configuration]) => {
          const { title, text, icon, children } = this.props;

          return (
            <DefaultTemplate
              HeaderProps={{
                address: account,
                ethBalance: balances && balances.eth,
                canInvest: capabibility && capabibility.canInvest,
                canInteract: capabibility && capabibility.canInteract,
                canonicalPriceFeedAddress:
                  configuration && configuration.priceSource,
                network: network && network.network,
                currentBlock: network && network.currentBlock,
                blockOverdue: network && network.blockOverdue,
                nodeSynced: network && network.nodeSynced,
                priceFeedUp: network && network.priceFeedUp,
              }}
              HeadlineProps={
                title
                  ? {
                      title,
                      text,
                      icon,
                    }
                  : null
              }
            >
              {children}
            </DefaultTemplate>
          );
        }}
      </Composer>
    );
  }
}
