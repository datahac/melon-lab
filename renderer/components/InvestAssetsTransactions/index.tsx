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
  const disableAssets = currentAssets.filter(current => {
    return (allowedAssets || []).indexOf(current) !== -1;
  });

  const enableAssets = (allowedAssets || []).filter(current => {
    return currentAssets.indexOf(current) === -1;
  });

  if (disableAssets && disableAssets.length > 0) {
    estimations.push({
      mutation: EstimateDisableInvestmentMutation,
      variables: {
        fundAddress: props.address,
        assets: disableAssets,
      },
      name: 'disableInvestment',
    });

    executions.push({
      mutation: ExecuteDisableInvestmentMutation,
      variables: {
        fundAddress: props.address,
        assets: disableAssets,
      },
    });
  }

  if (enableAssets && enableAssets.length > 0) {
    estimations.push({
      mutation: EstimateEnableInvestmentMutation,
      variables: {
        fundAddress: props.address,
        assets: enableAssets,
      },
      name: 'enableInvestment',
    });

    executions.push({
      mutation: ExecuteEnableInvestmentMutation,
      variables: {
        fundAddress: props.address,
        assets: enableAssets,
      },
    });
  }

  if (!estimations.length || !executions.length) {
    return null;
  }

  executions[executions.length - 1].update = () => {
    props.setAllowedAssets(null);

    props.router.push({
      pathname: '/invest',
      query: {
        address: props.address,
      },
    });
  };

  return (
    <ModalTransactions
      text={`The following method on the Melon Smart Contracts will be executed:`}
      open={!!props.allowedAssets}
      estimations={estimations}
      executions={executions}
    />
  );
});
