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

const estimateDeployMaxPositionsMutation = gql`
  mutation EstimateDeployMaxPositions($positions: Int!) {
    estimate: estimateDeployMaxPositions(positions: $positions) @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const estimateDeployMaxConcentrationMutation = gql`
  mutation EstimateDeployMaxConcentration($percent: Float!) {
    estimate: estimateDeployMaxConcentration(percent: $percent) @account {
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
  const [registerPolicies, setRegisterPolicies] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const selectedPolicies = R.compose(
    R.map(R.zipObj(['name', 'value'])),
    R.toPairs,
  )(R.path(['values', 'policies'], props));

  const policiesToEstimations = {
    maxConcentration: {
      mutation: estimateDeployMaxConcentrationMutation,
      variables: () => ({
        percent: R.pathOr(0, ['values', 'policies', 'maxConcentration'], props),
      }),
    },
    priceTolerance: {
      mutation: estimateDeployPriceToleranceMutation,
      variables: () => ({
        percent: R.pathOr(0, ['values', 'policies', 'priceTolerance'], props),
      }),
    },
    maxPositions: {
      mutation: estimateDeployMaxPositionsMutation,
      variables: () => ({
        positions: R.pathOr(0, ['values', 'policies', 'maxPositions'], props),
      }),
    },
  };

  const policiesEstimations =
    selectedPolicies &&
    selectedPolicies.map(policy => ({
      ...policiesToEstimations[policy.name],
      isComplete: !!registerPolicies.find(item => item.name === policy.name),
      name: policy.name,
    }));

  const policiesExecutions =
    selectedPolicies &&
    selectedPolicies.map(policy => {
      return {
        mutation: executeDeployMutation,
        variables: (_, transaction) => ({
          ...transaction,
        }),
        update: (_, result) => {
          const data = {
            address: result.data.execute,
            type: 'TRADE',
            name: policy.name,
          };
          setRegisterPolicies([...registerPolicies, data]);
        },
      };
    });

  return (
    <ModalTransactions
      text={`The following method on the Melon Smart Contracts will be executed:`}
      open={isActive && props.progress}
      estimations={[
        ...policiesEstimations,
        {
          mutation: estimateRegisterPoliciesMutation,
          variables: () => ({
            policies: registerPolicies.map(({ name, ...item }) => item),
          }),
          isComplete: false,
          name: 'registerPolicies',
        },
      ]}
      executions={[
        ...policiesExecutions,
        {
          mutation: executeRegisterPoliciesMutation,
          variables: (_, transaction) => ({
            ...transaction,
          }),
          update: () => {
            setIsActive(false);
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
