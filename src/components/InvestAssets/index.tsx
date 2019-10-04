import * as R from 'ramda';
import React, { useState, Fragment } from 'react';
import Composer from 'react-composer';
import { TokensQuery } from '../Setup/data/tokens';
import { FundQuery } from './data/fund';
import withForm from './withForm';
import InvestAssetsForm from '~/components/InvestAssetsForm';
import InvestAssetsTransactions from '../InvestAssetsTransactions';

const InvestAssetsFormContainer = withForm(props => <InvestAssetsForm {...props} />);

const InvestAssetsContainer = ({ address, ...props }) => {
  const [allowedAssets, setAllowedAssets] = useState(null);

  return (
    <Composer components={[<TokensQuery />, <FundQuery address={address} />]}>
      {([tokenProps, fundProps]) => {
        const all = R.pathOr([], ['data', 'tokens'], tokenProps);
        const current = R.pathOr([], ['data', 'fund', 'investAllowed'], fundProps);

        return (
          <Fragment>
            <InvestAssetsFormContainer
              {...props}
              loading={tokenProps.loading || fundProps.loading}
              address={address}
              availableAssets={all}
              allowedAssets={current}
              setAllowedAssets={setAllowedAssets}
            />

            <InvestAssetsTransactions
              address={address}
              currentAssets={current.map(item => item.address)}
              allowedAssets={allowedAssets}
              setAllowedAssets={setAllowedAssets}
            />
          </Fragment>
        );
      }}
    </Composer>
  );
};

export default InvestAssetsContainer;
