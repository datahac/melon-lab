import React from 'react';
import Composer from 'react-composer';
import DefaultTemplate from '~/templates/DefaultTemplate';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { CapabilityConsumer } from '+/components/CapabilityContext';
import { ConfigurationConsumer } from '+/components/ConfigurationContext';

const DefaultTemplateContainer = ({ title, text, icon, children }) => (
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
          HeadlineProps={
            title
              ? {
                  title,
                  text,
                  icon,
                }
              : null
          }
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

export default DefaultTemplateContainer;
