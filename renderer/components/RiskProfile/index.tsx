import React, { Fragment, useState } from 'react';
import { withRouter } from 'next/router';
import { compose } from 'recompose';
import RiskProfile from '~/components/RiskProfile';
import { withApollo } from 'react-apollo';
import Composer from 'react-composer';
import withForm from './withForm';
import PoliciesTransactions from '+/components/PoliciesTransactions';
import * as R from 'ramda';
import availablePolicies from '~/shared/utils/availablePolicies';
import { TokensQuery } from './data/tokens';
import Spinner from '~/blocks/Spinner';
import { FundPoliciesQuery } from './data/fund';

const RiskProfileFormContainer = withForm(props => {
  const tokens = R.propOr([], 'tokens', props)
    .reduce((carry, current) => {
      return carry.concat([
        {
          value: current.address.toLowerCase(),
          label: current.symbol,
        },
      ]);
    }, []);

  return (
    <RiskProfile
      {...props}
      onActivatePolicy={props.onActivatePolicy}
      availablePolicies={availablePolicies(tokens)}
    />
  );
});

const RiskProfileContainer = ({ ...props }) => {
  const [formValues, setFormValues] = useState(null);
  const [registerPolicies, setRegisterPolicies] = useState([]);

  return (
    <Composer
      components={[
        <TokensQuery />,
        <FundPoliciesQuery address={props.address} />
      ]}
    >
      {([tokensProps, policyProps]) => {
        const loading = tokensProps.loading || policyProps.loading;
        const availableTokens = R.path(['data', 'tokens'], tokensProps);
        const existingPolicies = R.path(['data', 'fund', 'policies'], policyProps);

        return (
          <Fragment>
            <PoliciesTransactions
              address={props.address}
              destination={props.destination}
              registerPolicies={registerPolicies}
              setRegisterPolicies={setRegisterPolicies}
              setFormValues={setFormValues}
              values={formValues}
            />

            {loading && <Spinner icon />}
            
            {!loading && (
              <RiskProfileFormContainer
                {...props}
                existingPolicies={existingPolicies}
                setFormValues={setFormValues}
                tokens={availableTokens}
              />
            )}
          </Fragment>
        );
      }}
    </Composer>
  );
};

export default compose(
  withRouter,
  withApollo,
)(RiskProfileContainer);
