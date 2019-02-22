import * as Tm from '@melonproject/token-math';
import React, { useState, Fragment } from 'react';
import ParticipationForm from '~/components/ParticipationForm';
import InvestTransactions from '+/components/InvestTransactions';
import withForm from './withForm';
import { withRouter } from 'next/router';
import { FundQuery } from './data/fund';
import { RequestQuery } from './data/request';
import * as R from 'ramda';
import Composer from 'react-composer';
import { AccountConsumer } from '+/components/AccountContext';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';

const ParticipationFormContainer = withForm(props => (
  <ParticipationForm {...props} />
));

const InvestContainer = ({ address, ...props }) => {
  const [step, setStep] = useState(0);
  const [investValues, setInvestValues] = useState(null);

  return (
    <Composer
      components={[
        <AccountConsumer />,
        <FundQuery address={address} />,
        ({ results: [account], render }) => (
          <RequestQuery
            fundAddress={address}
            userAddress={account}
            children={render}
          />
        ),
      ]}
    >
      {([account, fundProps, requestProps]) => {
        const waitingTime = R.pathOr(
          '0',
          ['data', 'hasActiveRequest', 'waitingTime'],
          requestProps,
        );
        const hasActiveRequest = R.path(
          ['data', 'hasActiveRequest'],
          requestProps,
        );

        const isWaiting = Tm.greaterThan(waitingTime, '0');
        const readyToExecute = Tm.isZero(waitingTime) && !!hasActiveRequest;
        const isInitialRequest = Tm.isZero(
          R.pathOr('0', ['data', 'fund', 'totalSupply', 'quantity'], fundProps),
        );
        const isExpired = R.path(
          ['data', 'hasActiveRequest', 'isExpired'],
          requestProps,
        );

        const sharePrice = R.path(['data', 'fund', 'sharePrice'], fundProps);
        const allowedAssets = R.path(['data', 'fund', 'investAllowed'], fundProps);
        const loading = R.path(['loading'], fundProps);

        return (
          <Fragment>
            <ParticipationFormContainer
              {...props}
              setInvestValues={setInvestValues}
              loading={loading}
              sharePrice={sharePrice}
              allowedAssets={allowedAssets}
              setStep={setStep}
              isWaiting={isWaiting}
              readyToExecute={readyToExecute}
              isInitialRequest={isInitialRequest}
              executeRequest={() => setStep(4)}
              cancelRequest={() => setStep(5)}
              isExpired={isExpired}
              account={account}
            />

            <InvestTransactions
              fundAddress={address}
              values={investValues}
              setStep={setStep}
              setInvestValues={setInvestValues}
              step={step}
              isWaiting={isWaiting}
              readyToExecute={readyToExecute}
              isInitialRequest={isInitialRequest}
              isExpired={isExpired}
            />
          </Fragment>
        );
      }}
    </Composer>
  );
};

export default compose(
  withRouter,
  withApollo,
)(InvestContainer);
