import React, { Fragment } from 'react';
import Composer from 'react-composer';
import HomeTemplate from '~/templates/HomeTemplate';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { CapabilityConsumer } from '+/components/CapabilityContext';
import { ConfigurationConsumer } from '+/components/ConfigurationContext';
import GetStarted from '+/components/GetStarted';
import Ranking from '+/components/Ranking';
import WarningModal from '../WarningModal';

const HomeTemplateContainer = ({ title, text, icon, children }) => (
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
        <Fragment>
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

          {network.network === 'LIVE' && (
            <WarningModal
              text={
                <div>
                  You are connected to the <strong>mainnet</strong>
                  <br />
                  <br />
                  <strong>This is untested alpha software.</strong>
                  <br />
                  <br />
                  No contributor can be held liable for any damage to your
                  computer or loss of funds by using this application.
                  <br />
                  <br />
                  <strong>Use at your own risk. Do your own research.</strong>
                </div>
              }
              isOpen
            />
          )}
        </Fragment>
      );
    }}
  </Composer>
);

export default HomeTemplateContainer;
