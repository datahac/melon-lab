import React from 'react';
import Composer from 'react-composer';
import HomeTemplate from '~/templates/HomeTemplate';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { CapabilityConsumer } from '+/components/CapabilityContext';
import { ConfigurationConsumer } from '+/components/ConfigurationContext';
import GetStarted from '+/components/GetStarted';
import Ranking from '+/components/Ranking';

export default class HomeTemplateContainer extends React.PureComponent {
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
            <HomeTemplate
              HeaderProps={{
                address: account,
                ethBalance: balances && balances.eth,
                canInvest: capabibility && capabibility.canInvest,
                canInteract: capabibility && capabibility.canInteract,
                canonicalPriceFeedAddress:
                  configuration && configuration.canonicalPriceFeedAddress,
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
              GetStarted={GetStarted}
              GetStartedProps={{
                isHome: true,
              }}
              Ranking={Ranking}
            >
              {children}
            </HomeTemplate>
          );
        }}
      </Composer>
    );
  }
}
