import * as Tm from '@melonproject/token-math';
import React, { useState, Fragment } from 'react';
import Participation from '~/components/ParticipationForm';
import InvestTransactions from '+/components/InvestTransactions';
import withForm from './withForm';
import { withRouter } from 'next/router';
import { FundQuery } from './data/fund';
import { RequestQuery } from './data/request';
import * as R from 'ramda';
import Composer from 'react-composer';
import { AccountConsumer } from '+/components/AccountContext';

const ParticipationFormContainer = withForm(props => (
  <Participation
    {...props}
    setup={true}
    setInvestValues={props.setInvestValues}
  />
));

const InvestContainer = ({ address, ...props }) => {
  const [step, setStep] = useState(null);
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
        const readyToExecute = Tm.isZero(waitingTime) && hasActiveRequest;
        const isInitialRequest = Tm.isZero(
          R.pathOr('0', ['data', 'fund', 'totalSupply', 'quantity'], fundProps),
        );

        return (
          <Fragment>
            <ParticipationFormContainer
              {...props}
              setInvestValues={setInvestValues}
              loading={R.path(['loading'], fundProps)}
              sharePrice={R.path(['data', 'fund', 'sharePrice'], fundProps)}
              setStep={setStep}
              isWaiting={isWaiting}
              readyToExecute={readyToExecute}
              executeRequest={() => setStep(3)}
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
            />
          </Fragment>
        );
      }}
    </Composer>
  );
};

export default withRouter(InvestContainer);
