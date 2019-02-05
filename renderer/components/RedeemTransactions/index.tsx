import ModalTransactions from '+/components/ModalTransactions';
import { withRouter } from 'next/router';
import React from 'react';

import {
  estimateRedeemMutation,
  executeRedeemMutation,
} from '~/queries/redeem.gql';

export default withRouter(props => {
  const estimations: any[] = [];
  const executions: any[] = [];

  estimations.push({
    mutation: estimateRedeemMutation,
    variables: props.values && {
      fundAddress: props.fundAddress,
      sharesQuantity: props.values.quantity.quantity.toString(),
    },
    name: 'redeem',
  });

  executions.push({
    mutation: executeRedeemMutation,
    variables: props.values && {
      fundAddress: props.fundAddress,
    },
    update: () => {
      props.setRedeemValues(null);
      props.router.push({
        pathname: '/manage',
        query: {
          address: props.fundAddress,
        },
      });
    },
  });

  return (
    <ModalTransactions
      text={`The following method on the Melon Smart Contracts will be executed:`}
      open={!!props.values || !!props.step}
      estimations={estimations}
      executions={executions}
      handleCancel={() => {
        props.setRedeemValues(null);
      }}
    />
  );
});
