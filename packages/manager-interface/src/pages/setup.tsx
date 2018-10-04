import React from 'react';
import Layout from '+/components/Layout';
import Setup from '+/components/Setup';
import { withRouter } from 'next/router';
import { compose, lifecycle } from 'recompose';

// const mapOnboardingStateToMainContainer = (onboardingState) => {
//   const map = {
//     [onboardingPath.NO_PROVIDER]: NoConnection,
//     [onboardingPath.NO_CONNECTION]: NoConnection,
//     [onboardingPath.WRONG_NETWORK]: WrongNetwork,
//     [onboardingPath.LOCKED_ACCOUNT]: LockedWallet,
//     [onboardingPath.INSUFFICIENT_FUNDS]: InsufficientFunds,
//     [onboardingPath.NOT_SIGNED]: TermsAndConditionsContainer,
//     [onboardingPath.NO_FUND_CREATED]: SetupContainer,
//     [onboardingPath.NOT_INVESTED_IN_OWN_FUND]:
//       track !== 'kovan-demo'
//         ? ParosContributionContainer
//         : ParticipationContainer,
//   };

//   return map[onboardingState] || SetupContainer;
// };

// const Setup = (props) => {
//   const Component = mapOnboardingStateToMainContainer(props.onboardingState);
//   return Component && <Component {...props} />;
// };

const Page = props => (
  <Layout {...props}>
    <Setup {...props} />
  </Layout>
);

const withPageLifecycle = lifecycle({
  componentDidMount() {
    this.props.account && this.props.subscribeToNewBalance();
  },
});

export default compose(
  withRouter,
  withPageLifecycle,
)(Page);
