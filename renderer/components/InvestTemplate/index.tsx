import React from 'react';
import Composer from 'react-composer';
import WalletTemplate from '~/templates/WalletTemplate';
import { withRouter } from 'next/router';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { CapabilityConsumer } from '+/components/CapabilityContext';
import { ConfigurationConsumer } from '+/components/ConfigurationContext';
import { FundManagerConsumer } from '../FundManagerContext';

const InvestTemplateContainer = ({ router, title, address, children }) => (
  <Composer
    components={[
      <AccountConsumer />,
      <BalanceConsumer />,
      <NetworkConsumer />,
      <CapabilityConsumer />,
      <ConfigurationConsumer />,
      <FundManagerConsumer />,
    ]}
  >
    {([account, balances, network, capabibility, configuration, manager]) => {
      return (
        <WalletTemplate
          NavigationProps={
            account &&
            manager &&
            manager.fund === address && {
              activePath: router.pathname,
              navigationItems: [
                {
                  name: 'Invest',
                  href: `/invest?address=${address}`,
                },
                {
                  name: 'Allowed assets',
                  href: `/invest/assets?address=${address}`,
                },
              ],
            }
          }
          HeaderProps={{
            address: account,
            ethBalance: balances && balances.eth,
            canInvest: capabibility && capabibility.canInvest,
            canInteract: capabibility && capabibility.canInteract,
            canonicalPriceFeedAddress:
              configuration && configuration.melonContracts.priceSource,
            network: network && network.network,
            currentBlock: network && network.currentBlock,
            blockOverdue: network && network.blockOverdue,
            nodeSynced: network && network.nodeSynced,
            priceFeedUp: network && network.priceFeedUp,
          }}
          HeadlineProps={{
            title,
          }}
        >
          {children}
        </WalletTemplate>
      );
    }}
  </Composer>
);

export default withRouter(InvestTemplateContainer);
