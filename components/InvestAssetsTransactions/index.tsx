import React from 'react';
import { withRouter } from 'next/router';
import ModalTransactions from '+/components/ModalTransactions';

import {
  EstimateEnableInvestmentMutation,
  ExecuteEnableInvestmentMutation,
  EstimateDisableInvestmentMutation,
  ExecuteDisableInvestmentMutation,
} from '~/queries/investAssets.gql';

export default withRouter(props => {
  const estimations: any[] = [];
  const executions: any[] = [];

  const { currentAssets, allowedAssets } = props;
  const disableAssets = allowedAssets
    ? currentAssets.filter(current => {
        return (allowedAssets || []).indexOf(current) === -1;
      })
    : [];

  const enableAssets = (allowedAssets || []).filter(current => {
    return currentAssets.indexOf(current) === -1;
  });

  estimations.push({
    name: 'disableInvestment',
    mutation: EstimateDisableInvestmentMutation,
    isComplete: !disableAssets.length,
    variables: {
      fundAddress: props.address,
      assets: disableAssets,
    },
  });

  executions.push({
    mutation: ExecuteDisableInvestmentMutation,
    isComplete: !disableAssets.length,
    variables: {
      fundAddress: props.address,
      assets: disableAssets,
    },
    refetchQueries: () => ['FundInvestAllowedQuery'],
  });

  estimations.push({
    name: 'enableInvestment',
    mutation: EstimateEnableInvestmentMutation,
    isComplete: !enableAssets.length,
    variables: {
      fundAddress: props.address,
      assets: enableAssets,
    },
  });

  executions.push({
    mutation: ExecuteEnableInvestmentMutation,
    isComplete: !enableAssets.length,
    variables: {
      fundAddress: props.address,
      assets: enableAssets,
    },
    refetchQueries: () => ['FundInvestAllowedQuery'],
  });

  return (
    <ModalTransactions
      text={`The following method on the Melon Smart Contracts will be executed:`}
      open={!!props.allowedAssets}
      estimations={estimations}
      executions={executions}
      handleCancel={() => {
        props.setAllowedAssets(null);
      }}
      handleComplete={() => {
        props.setAllowedAssets(null);

        props.router.push({
          pathname: '/invest',
          query: {
            address: props.address,
          },
        });
      }}
    />
  );
});
