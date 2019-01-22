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
  const [isActive, setIsActive] = useState(true);

  return (
    <ModalTransactions
      text={`The following method on the Melon Smart Contracts will be executed:`}
      open={isActive && props.progress}
      estimations={[
        ...(!!R.path(['values', 'policies', 'priceTolerance'], props)
          ? [
              {
                mutation: estimateDeployPriceToleranceMutation,
                variables: () => ({
                  percent: R.pathOr(
                    0,
                    ['values', 'policies', 'priceTolerance'],
                    props,
                  ),
                }),
                isComplete: !!policies.find(
                  item => item.name === 'priceTolerance',
                ),
                name: 'priceTolerance',
              },
            ]
          : []),
        ...(!!R.path(['values', 'policies', 'maxPositions'], props)
          ? [
              {
                mutation: estimateDeployPriceToleranceMutation,
                variables: () => ({
                  percent: R.pathOr(
                    0,
                    ['values', 'policies', 'maxPositions'],
                    props,
                  ),
                }),
                isComplete: !!policies.find(
                  item => item.name === 'maxPositions',
                ),
                name: 'maxPositions',
              },
            ]
          : []),
        {
          mutation: estimateRegisterPoliciesMutation,
          variables: () => ({
            policies: policies.map(({ name, ...item }) => item),
          }),
          isComplete: false,
          name: 'registerPolicies',
        },
      ]}
      executions={[
        ...(!!R.path(['values', 'policies', 'priceTolerance'], props)
          ? [
              {
                mutation: executeDeployMutation,
                variables: (_, transaction) => ({
                  ...transaction,
                }),
                update: (_, result) => {
                  const policy = {
                    address: result.data.execute,
                    type: 'TRADE',
                    name: 'priceTolerance',
                  };
                  setPolicies([...policies, policy]);
                },
              },
            ]
          : []),
        ...(!!R.path(['values', 'policies', 'priceTolerance'], props)
          ? [
              {
                mutation: executeDeployMutation,
                variables: (_, transaction) => ({
                  ...transaction,
                }),
                update: (_, result) => {
                  console.log(result.data.execute);
                  const policy = {
                    address: result.data.execute,
                    type: 'TRADE',
                    name: 'maxPositions',
                  };
                  setPolicies([...policies, policy]);
                },
              },
            ]
          : []),
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
