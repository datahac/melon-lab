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
      ({ results: [, , network], render }) => <SettingsConsumer network={network} children={render} />,
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
              canonicalPriceFeedAddress: configuration && configuration.canonicalPriceFeedAddress,
              network: network && network.network,
              currentBlock: network && network.currentBlock,
              blockOverdue: network && network.blockOverdue,
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
                <Fragment>
                  <h2>You are about to enter Melon on the Ethereum Main network</h2>
                  <p>
                    <b>IMPORTANT NOTE:</b> Please read the full version of this{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://github.com/melonproject/software-disclaimer/blob/master/MelonProtocolDisclaimer.md"
                    >
                      disclaimer
                    </a>{' '}
                    carefully before using the MELON Protocol.
                  </p>
                  <p>
                    {' '}
                    YOUR USE OF THE MELON PROTOCOL AND/OR THE SOFTWARE MAY BE SUBJECT TO THE FINANCIAL LAWS AND
                    REGULATIONS OF VARIOUS JURISDICTIONS. PRIOR TO USING THE MELON PROTOCOL, SEEK LEGAL ASSISTANCE TO
                    ASSURE THAT YOU MAY USE THE SOFTWARE IN COMPLIANCE WITH APPLICABLE LAW.{' '}
                    <b>
                      FAILURE TO DO SO MAY SUBJECT YOU TO CRIMINAL AS WELL AS CIVIL PENALTIES IN ONE OR MORE
                      JURISDICTIONS.
                    </b>{' '}
                    BY USING THIS SOFTWARE, YOU CONFIRM THAT YOU HAVE SOUGHT THE ADVICE OF COMPETENT COUNSEL OR ARE
                    OTHERWISE FAMILIAR WITH THE APPLICABLE LAWS AND REGULATIONS PERTAINING TO YOUR INTENDED USE OF THE
                    MELON PROTOCOL.
                  </p>
                  <p>
                    {' '}
                    BY USING THIS SOFTWARE, YOU UNDERSTAND, ACKNOWLEDGE AND ACCEPT THAT THE MELON PROTOCOL AND/OR THE
                    UNDERLYING SOFTWARE ARE PROVIDED “AS IS” AND WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND
                    EITHER EXPRESSED OR IMPLIED. ANY USE OF THIS OPEN SOURCE SOFTWARE RELEASED UNDER THE GNU GENERAL
                    PUBLIC LICENSE VERSION 3 (GPL 3) IS DONE AT YOUR OWN RISK TO THE FULLEST EXTENT PERMISSIBLE PURSUANT
                    TO APPLICABLE LAW ANY AND ALL LIABILITY AS WELL AS ALL WARRANTIES, INCLUDING ANY FITNESS FOR A
                    PARTICULAR PURPOSE WITH RESPECT TO THE MELON PROTOCOL AND/OR THE UNDERLYING SOFTWARE AND THE USE
                    THEREOF ARE DISCLAIMED.
                  </p>
                  <strong style={{ fontSize: '1.5em', color: 'red' }}>
                    Use at your own risk. Do your own research.{' '}
                  </strong>
                </Fragment>
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
