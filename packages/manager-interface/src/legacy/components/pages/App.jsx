import React from 'react';
import WrongNetwork from '@melonproject/manager-components/components/WrongNetwork';
import NoConnection from '@melonproject/manager-components/components/NoConnection';
import LockedWallet from '@melonproject/manager-components/components/LockedWallet';
import InsufficientFunds from '@melonproject/manager-components/components/InsufficientFunds';
import TermsAndConditionsContainer from '../../containers/TermsAndConditions';
import SetupContainer from '../../containers/Setup';
import ParosContributionContainer from '../../containers/ParosContribution';
import { onboardingPath } from '../../reducers/app';
import FundContainer from './../../containers/Fund';
import OverviewContainer from './Overview';
import ParticipationContainer from '../../containers/Participation';
import WalletContainer from '../../containers/wallet/Account';
import WalletGenerate from '../../containers/wallet/Generate';
import RestoreContainer from '../../containers/wallet/Restore';
import ImportContainer from '../../containers/wallet/Import';
import CompetitionRegistrationContainer from '../../containers/CompetitionRegistration';
import OlympiadPlaceholderContainer from '../../containers/OlympiadPlaceholder';
import ModalContainer from '../../containers/Modal';
import { types } from '../../actions/routes';
import { greaterThan } from '../../utils/functionalBigNumber';
import Header from '@melonproject/manager-components/components/Header';
import Footer from '@melonproject/manager-components/components/Footer';
import Layout from '@melonproject/manager-components/design/Layout';
import '~/static/images/logos.svg';
import '~/static/images/icons.svg';

const shortenAddress = address =>
  `${address.slice(0, 6)}…${address.substr(-4)}`;

const mapOnboardingStateToMainContainer = (onboardingState, track) => {
  const map = {
    [onboardingPath.NO_PROVIDER]: NoConnection,
    [onboardingPath.NO_CONNECTION]: NoConnection,
    [onboardingPath.WRONG_NETWORK]: WrongNetwork,
    [onboardingPath.LOCKED_ACCOUNT]: LockedWallet,
    [onboardingPath.INSUFFICIENT_FUNDS]: InsufficientFunds,
    [onboardingPath.NOT_SIGNED]: TermsAndConditionsContainer,
    [onboardingPath.NO_FUND_CREATED]: SetupContainer,
    [onboardingPath.NOT_INVESTED_IN_OWN_FUND]:
      track !== 'kovan-demo'
        ? ParosContributionContainer
        : ParticipationContainer,
  };

  return map[onboardingState];
};

const routeContainerMap = {
  [types.ROOT]: OverviewContainer,
  [types.RANKING]: OverviewContainer,
  [types.WALLET_GENERATE]: WalletGenerate,
  [types.WALLET_RESTORE]: RestoreContainer,
  [types.WALLET_CREATE]: WalletContainer,
  [types.WALLET_IMPORT]: ImportContainer,
  [types.FUND]: FundContainer,
  [types.WALLET]: WalletContainer,
  [types.COMPETITION]: CompetitionRegistrationContainer,
};

const getMainComponent = ({
  onboardingState,
  mlnBalance,
  ethBalance,
  wethBalance,
  usersFund,
  showFaucet,
  walletAddress,
  route,
  network,
  networkName,
  track,
  isElectron,
}) => {
  const Main =
    route === types.SETUP
      ? mapOnboardingStateToMainContainer(onboardingState, track)
      : routeContainerMap[route];
  return Main ? (
    <Main
      mlnBalance={mlnBalance}
      ethBalance={ethBalance}
      wethBalance={wethBalance}
      setup
      usersFund={usersFund}
      walletAddress={walletAddress}
      network={network}
      showFaucet={showFaucet}
    />
  ) : (
    <div />
  );
};

const App = props => {
  const headerData = {
    status: {
      message: props.statusMessage,
      type: props.statusType,
    },
    balances: {
      eth: props.ethBalance,
    },
    network: props.networkName,
    accountAddress: shortenAddress(props.walletAddress || ''),
    goToHome: props.goToHome,
    goToWallet: props.goToWallet,
  };
  return (
    <div className="App">
      {props.network !== '42' &&
        (greaterThan(props.ethBalance, 1) || greaterThan(props.fundNav, 1)) &&
        !props.isElectron && (
          <a
            href="https://github.com/melonproject/melon-lab/releases"
            target="_blank"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              backgroundColor: 'rgb(209, 102, 102)',
              color: 'white',
              fontWeight: 'bold',
              padding: 10,
              zIndex: 10,
            }}
          >
            {' '}
            Warning: You are using the Melon Interface in an insecure
            environment (your browser) and putting your funds at risk! Please be
            a good citizen and download our Electron app and run your own node
            for a fast and secure experience.
          </a>
        )}

      <div
        style={{
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 1,
        }}
      >
        <Header {...headerData} />
      </div>

      <Layout>{getMainComponent(props)}</Layout>
      <div
        style={{
          position: 'fixed',
          width: '100%',
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Footer />
      </div>
      <ModalContainer />
    </div>
  );
};

export default App;
