import React from 'react';
import Composer from 'react-composer';
import { withRouter } from 'next/router';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { CapabilityConsumer } from '+/components/CapabilityContext';
import { ConfigurationConsumer } from '+/components/ConfigurationContext';
import { FundManagerConsumer } from '../FundManagerContext';
import DefaultTemplate from '~/templates/DefaultTemplate';

const ConvertTemplateContainer = ({ router, title, address, children }) => (
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
        <DefaultTemplate
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
          FooterProps={{
            priceFeedUpdate: network && network.priceFeedUpdate,
          }}
        >
          {children}
        </DefaultTemplate>
      );
    }}
  </Composer>
);

export default withRouter(ConvertTemplateContainer);
