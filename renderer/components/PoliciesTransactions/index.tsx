import ModalTransactions from '+/components/ModalTransactions';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';
import * as R from 'ramda';
import React, { useState } from 'react';

const estimateDeployAssetWhitelistMutation = gql`
  mutation EstimateDeployAssetWhitelist($symbols: [String]) {
    estimate: estimateDeployAssetWhitelist(symbols: $symbols) @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const estimateDeployAssetBlacklistMutation = gql`
  mutation EstimateDeployAssetBlacklist($symbols: [String]) {
    estimate: estimateDeployAssetBlacklist(symbols: $symbols) @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const estimateDeployUserWhitelistMutation = gql`
  mutation EstimateDeployUserWhitelist($addresses: [String]) {
    estimate: estimateDeployUserWhitelist(addresses: $addresses) @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

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
  const policiesValues = R.path(['values', 'policies'], props);

  const selectedPolicies = R.compose(
    R.map(R.zipObj(['name', 'value'])),
    R.toPairs,
  )(policiesValues);

  console.log(
    R.path(['assetBlacklist'], policiesValues) &&
      policiesValues.assetBlacklist.reduce((carry, current) => {
        return carry.concat([current.value]);
      }, []),
  );

  const policiesToEstimations = {
    maxConcentration: {
      mutation: estimateDeployMaxConcentrationMutation,
      variables: {
        percent: R.path(['maxConcentration'], policiesValues),
      },
    },
    priceTolerance: {
      mutation: estimateDeployPriceToleranceMutation,
      variables: {
        percent: R.path(['priceTolerance'], policiesValues),
      },
    },
    maxPositions: {
      mutation: estimateDeployMaxPositionsMutation,
      variables: {
        positions: R.path(['maxPositions'], policiesValues),
      },
    },
    userWhitelist: {
      mutation: estimateDeployUserWhitelistMutation,
      variables: {
        addresses:
          R.path(['userWhitelist'], policiesValues) &&
          policiesValues.userWhitelist.replace(/^\s+|\s+$/g, '').split('\n'),
      },
    },
    assetWhitelist: {
      mutation: estimateDeployAssetWhitelistMutation,
      variables: {
        symbols:
          R.path(['assetWhitelist'], policiesValues) &&
          policiesValues.assetWhitelist.reduce((carry, current) => {
            return carry.concat([current.value]);
          }, []),
      },
    },
    assetBlacklist: {
      mutation: estimateDeployAssetBlacklistMutation,
      variables: {
        symbols:
          R.path(['assetBlacklist'], policiesValues) &&
          policiesValues.assetBlacklist.reduce((carry, current) => {
            return carry.concat([current.value]);
          }, []),
      },
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
        update: (_, result) => {
          const data = {
            address: result.data.execute,
            type: policy.name === 'userWhitelist' ? 'INVEST' : 'TRADE',
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
          variables: {
            policies: registerPolicies.map(({ name, ...item }) => item),
          },
          isComplete: false,
          name: 'registerPolicies',
        },
      ]}
      executions={[
        ...policiesExecutions,
        {
          mutation: executeRegisterPoliciesMutation,
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
