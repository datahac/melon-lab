import React, { useState, Fragment } from 'react';
import RedeemForm from '~/components/ReedemForm';
import withForm from './withForm';
import { withRouter } from 'next/router';
import { FundQuery } from './data/fund';
import * as R from 'ramda';
import RedeemTransactions from '+/components/RedeemTransactions';

const RedeemFormContainer = withForm(props => <RedeemForm {...props} />);

const RedeemContainer = ({ address, ...props }) => {
  const [redeemValues, setRedeemValues] = useState(null);

  return (
    <FundQuery address={address}>
      {fundProps => {
        return (
          <Fragment>
            <RedeemFormContainer
              {...props}
              loading={R.path(['loading'], fundProps)}
              setRedeemValues={setRedeemValues}
              sharePrice={R.path(['data', 'fund', 'sharePrice'], fundProps)}
            />

            <RedeemTransactions
              fundAddress={address}
              values={redeemValues}
              setRedeemValues={setRedeemValues}
            />
          </Fragment>
        );
      }}
    </FundQuery>
  );
};

export default withRouter(RedeemContainer);
