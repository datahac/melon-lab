import React from 'react';
import { withRouter } from 'next/router';

import ModalTransactions from '+/components/ModalTransactions';

import {
  estimateApproveTransferMutation,
  executeApproveTransferMutation,
} from '~/queries/approve.gql';

import {
  estimateNothing,
  estimateExecuteRequestMutation,
  estimateRequestInvestmentMutation,
  executeExecuteRequestMutation,
  executeRequestInvestmentMutation,
  estimateCancelRequestMutation,
  executeCancelRequestMutation,
} from '~/queries/invest.gql';

export default withRouter(props => {
  const estimations: any[] = [];
  const executions: any[] = [];

  if (
    (props.isInitialRequest || !props.isWaiting) &&
    !props.isExpired &&
    props.values &&
    props.values.total
  ) {
    estimations.push(
      {
        mutation:
          props.step === 1 ? estimateApproveTransferMutation : estimateNothing,
        variables:
          props.step === 1
            ? {
                fundAddress: props.fundAddress,
                investmentAmount: props.values.total.quantity.toString(),
              }
            : {},
        isComplete: props.step > 1,
        name: 'approveTransfer',
      },
      {
        mutation:
          props.step === 2
            ? estimateRequestInvestmentMutation
            : estimateNothing,
        variables:
          props.step === 2
            ? {
                fundAddress: props.fundAddress,
                investmentAmount: props.values.total.quantity.toString(),
                maxPrice: props.values.price.quote.quantity.toString(),
              }
            : {},
        isComplete: props.step > 2,
        name: 'requestInvestment',
      },
    );

    executions.push(
      {
        mutation: executeApproveTransferMutation,
        variables: props.values && {
          fundAddress: props.fundAddress,
          investmentAmount: props.values.total.quantity.toString(),
        },
        update: () => {
          props.setStep(2);
        },
      },
      {
        mutation: executeRequestInvestmentMutation,
        variables: {
          fundAddress: props.fundAddress,
        },
        refetchQueries: () => ['FundQuery', 'RequestQuery'],
        update: () => {
          props.setStep(3);
        },
      },
    );
  }

  if (props.isInitialRequest || props.readyToExecute) {
    estimations.push({
      mutation: estimateExecuteRequestMutation,
      variables: {
        fundAddress: props.fundAddress,
      },
      name: 'executeRequest',
    });
    executions.push({
      mutation: executeExecuteRequestMutation,
      variables: {
        fundAddress: props.fundAddress,
      },
      update: () => {
        props.setStep(null);
        props.setInvestValues(null);
        // onCompleted is not working because of render
        props.router.push({
          pathname: '/manage',
          query: {
            address: props.fundAddress,
          },
        });
      },
    });
  }

  if (props.isExpired) {
    estimations.push({
      mutation: estimateCancelRequestMutation,
      variables: {
        fundAddress: props.fundAddress,
      },
      name: 'cancelRequest',
    });
    executions.push({
      mutation: executeCancelRequestMutation,
      variables: {
        fundAddress: props.fundAddress,
      },
      update: () => {
        props.setStep(null);
        props.setInvestValues(null);
        // onCompleted is not working because of render
        props.router.push({
          pathname: '/manage',
          query: {
            address: props.fundAddress,
          },
        });
      },
    });
  }

  return (
    <ModalTransactions
      text={`The following method on the Melon Smart Contracts will be executed:`}
      open={!!props.values || props.step > 0}
      estimations={estimations}
      executions={executions}
      handleCancel={() => {
        props.setInvestValues(null);
        props.setStep(null);
      }}
    />
  );
});
