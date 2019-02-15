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
import { SettingsConsumer } from '../SettingsContext';

const HomeTemplateContainer = ({ title, text, icon, children }) => (
  <Composer
    components={[
      <AccountConsumer />,
      <BalanceConsumer />,
      <NetworkConsumer />,
      <CapabilityConsumer />,
      <ConfigurationConsumer />,
      ({ results: [, , network], render }) => (
        <SettingsConsumer network={network} children={render} />
      ),
    ]}
  >
    {([account, balances, network, capabibility, configuration, settings]) => {
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
                  You are about to enter Melon on the{' '}
                  <strong>Ethereum Main network.</strong>
                  <br />
                  <br />
                  <strong>
                    This is untested alpha software. It may not perform as
                    expected.
                  </strong>
                  <br />
                  <br />
                  The Melon Technical Council, all former employees of Melonport
                  AG or any other contributor can not be held liable for any
                  damage to your computer or loss of funds by using this
                  application.
                  <br />
                  <br />
                  <strong style={{ fontSize: '1.5em', color: 'red' }}>
                    Use at your own risk. Do your own research.
                  </strong>
                  <br />
                  <br />
                  You are solely responsible for the regulatory compliance with
                  all laws that may apply to your individual use case of the
                  Melon protocol. This software is for demonstration only.
                </div>
              }
              isOpen={settings.isWarningModalOpen}
              handleSubmit={() => settings.setIsWarningModalOpen(false)}
            />
          )}
        </Fragment>
      );
    }}
  </Composer>
);

export default HomeTemplateContainer;
