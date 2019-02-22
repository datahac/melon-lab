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
import Dropdown from '~/blocks/Dropdown';
import { SharePriceQuery } from './data/sharePrice';
import Spinner from '~/blocks/Spinner';

const ParticipationFormContainer = withForm(props => (
  <ParticipationForm {...props} />
));

const InvestContainer = ({ address, ...props }) => {
  const [step, setStep] = useState(0);
  const [asset, setAsset] = useState(null);
  const [investValues, setInvestValues] = useState(null);

  return (
    <Composer
      components={[
        <AccountConsumer />,
        <FundQuery address={address} />,
        ({ results: [_, fundProps], render }) => {
          const firstAllowedAsset = R.compose(
            R.prop('symbol'),
            R.head,
            R.pathOr([], ['data', 'fund', 'investAllowed']),
          )(fundProps);

          return (
            <SharePriceQuery
              address={address}
              symbol={asset || firstAllowedAsset}
              children={render}
            />
          );
        },
        ({ results: [account], render }) => (
          <RequestQuery
            fundAddress={address}
            userAddress={account}
            children={render}
          />
        ),
      ]}
    >
      {([account, fundProps, sharePriceProps, requestProps]) => {
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

        const sharePrice = R.path(
          ['data', 'fund', 'sharePrice'],
          sharePriceProps,
        );
        const allowedAssets = R.pathOr(
          [],
          ['data', 'fund', 'investAllowed'],
          fundProps,
        );

        const fundLoading = R.path(['loading'], fundProps);
        const sharePriceLoading = R.path(['loading'], sharePriceProps);
        const firstAllowedAsset = R.compose(
          R.prop('symbol'),
          R.head,
        )(allowedAssets);

        return (
          <Fragment>
            {!fundLoading && !readyToExecute && (
              <Dropdown
                onChange={event => {
                  setAsset(event.target.value);
                }}
                value={asset || firstAllowedAsset}
                options={allowedAssets.map(token => ({
                  value: token.symbol,
                  name: token.symbol,
                }))}
                name="asset"
              />
            )}

            {((fundLoading || sharePriceLoading) && (
              <div>
                <Spinner icon size="small" />
              </div>
            )) || (
              <ParticipationFormContainer
                {...props}
                address={address}
                setInvestValues={setInvestValues}
                sharePrice={sharePrice}
                allowedAssets={allowedAssets}
                setStep={setStep}
                asset={asset || firstAllowedAsset}
                isWaiting={isWaiting}
                readyToExecute={readyToExecute}
                isInitialRequest={isInitialRequest}
                executeRequest={() => setStep(4)}
                cancelRequest={() => setStep(5)}
                isExpired={isExpired}
                account={account}
              />
            )}

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
