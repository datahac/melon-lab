import ModalTransactions from '+/components/ModalTransactions';
import { withRouter } from 'next/router';
import React from 'react';

import {
  estimateApproveTransferMutation,
  executeApproveTransferMutation,
} from '../../shared/graphql/schema/queries/approve.gql';

import {
  estimateExecuteRequestMutation,
  estimateRequestInvestmentMutation,
  executeExecuteRequestMutation,
  executeRequestInvestmentMutation,
} from '../../shared/graphql/schema/queries/invest.gql';

export default withRouter(props => (
  <ModalTransactions
    text={`The following method on the Melon Smart Contracts will be executed:`}
    open={!!props.values && !!props.step}
    estimations={[
      {
        mutation: estimateApproveTransferMutation,
        variables: () => ({
          fundAddress: props.fundAddress,
          investmentAmount: props.values.total.quantity.toString(),
        }),
        isComplete: props.step > 1,
        name: 'approveTransfer',
      },
      {
        mutation: estimateRequestInvestmentMutation,
        variables: () => ({
          fundAddress: props.fundAddress,
          investmentAmount: props.values.total.quantity.toString(),
        }),
        isComplete: props.step > 2,
        name: 'requestInvestment',
      },
      {
        mutation: estimateExecuteRequestMutation,
        variables: () => ({
          fundAddress: props.fundAddress,
        }),
        name: 'executeRequest',
      },
    ]}
    executions={[
      {
        mutation: executeApproveTransferMutation,
        variables: (_, transaction) => ({
          ...transaction,
          fundAddress: props.fundAddress,
          investmentAmount: props.values.total.quantity.toString(),
        }),
        update: (cache, result) => {
          props.setStep(2);
        },
      },
      {
        mutation: executeRequestInvestmentMutation,
        variables: (_, transaction) => ({
          ...transaction,
          fundAddress: props.fundAddress,
        }),
        update: (cache, result) => {
          props.setStep(3);
        },
      },
      {
        mutation: executeExecuteRequestMutation,
        variables: (_, transaction) => ({
          ...transaction,
          fundAddress: props.fundAddress,
        }),
        update: cache => {
          props.setStep(null);
          // onCompleted is not working because of render
          props.router.push({
            pathname: '/manage',
            query: {
              address: props.fundAddress,
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
));
