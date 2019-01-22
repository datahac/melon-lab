import ModalTransactions from '+/components/ModalTransactions';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';
import * as R from 'ramda';
import React, { useState } from 'react';

const estimateDeployPriceToleranceMutation = gql`
  mutation EstimateDeployPriceTolerance($percent: Int!) {
    estimate: estimateDeployPriceTolerance(percent: $percent) @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeDeployMutation = gql`
  mutation ExecuteDeploy(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String
    $value: String
  ) {
    execute: executeDeploy(
      unsigned: {
        data: $data
        from: $from
        gas: $gas
        gasPrice: $gasPrice
        to: $to
        value: $value
      }
    ) @sign @account
  }
`;

const estimateRegisterPoliciesMutation = gql`
  mutation EstimateRegisterPolicies($policies: [PolicyInput]!) {
    estimate: estimateRegisterPolicies(policies: $policies) @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeRegisterPoliciesMutation = gql`
  mutation ExecuteRegisterPolicies(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String
    $value: String
  ) {
    execute: executeRegisterPolicies(
      unsigned: {
        data: $data
        from: $from
        gas: $gas
        gasPrice: $gasPrice
        to: $to
        value: $value
      }
    ) @sign @account
  }
`;

export default withRouter(props => {
  const [policies, setPolicies] = useState([]);
  const [active, setActive] = useState(true);

  return (
    <ModalTransactions
      text={`The following method on the Melon Smart Contracts will be executed:`}
      open={active && props.progress}
      estimations={[
        {
          mutation: estimateDeployPriceToleranceMutation,
          variables: () => ({
            percent: R.pathOr(
              0,
              ['values', 'policies', 'priceTolerance'],
              props,
            ),
          }),
          isComplete: !!policies[0],
          name: 'priceTolerance',
        },
        {
          mutation: estimateRegisterPoliciesMutation,
          variables: () => ({
            policies,
          }),
          isComplete: false,
          name: 'registerPolicies',
        },
      ]}
      executions={[
        {
          mutation: executeDeployMutation,
          variables: (_, transaction) => ({
            ...transaction,
          }),
          update: (cache, result) => {
            console.log(result.data.execute);
            const policy = {
              address: result.data.execute,
              type: 'TRADE',
            };
            setPolicies([...policies, policy]);
          },
        },
        {
          mutation: executeRegisterPoliciesMutation,
          variables: (_, transaction) => ({
            ...transaction,
          }),
          update: () => {
            setActive(false);
            props.router.push({
              pathname: '/invest',
              query: {
                address: props.fund,
              },
            });
          },
        },
      ]}
      handleCancel={() => {
        props.router.push({
          pathname: '/wallet',
        });
      }}
    />
  );
});
