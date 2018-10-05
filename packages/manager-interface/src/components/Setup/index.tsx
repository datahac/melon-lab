import React from 'react';
import Setup from '@melonproject/manager-components/components/Setup/container';
import FundMutation from './data/fund';
import { compose, withHandlers, withState } from 'recompose';
import Router from 'next/router';

const withSignedState = withState('signed', 'setSigned', false);

const withSetupHandlers = withHandlers({
  onClickDecline: props => e => {
    Router.replace({
      pathname: '/wallet',
    });
  },
  onClickAccept: props => e => {
    props.setSigned(true);
  },
});

// Redirect to created fund
const redirect = address =>
  Router.replace({
    pathname: '/manage',
    query: { address: address },
  });

const withSetup = BaseComponent => baseProps => (
  <FundMutation onCompleted={redirect} account={baseProps.account}>
    {(createFund, createFundProps) => (
      <BaseComponent
        address={baseProps.account}
        balances={{
          eth: baseProps.eth,
          mln: baseProps.mln,
        }}
        onClickDecline={baseProps.onClickDecline}
        signed={baseProps.signed}
        onClickAccept={baseProps.onClickAccept}
        config={baseProps.config}
        onSubmit={values =>
          createFund({
            variables: {
              name: values.name,
              signed: baseProps.signed,
              privateKey: baseProps.privateKey,
            },
          })
        }
        loading={createFundProps.loading}
      />
    )}
  </FundMutation>
);

export default compose(
  withSignedState,
  withSetupHandlers,
  withSetup,
)(Setup);
