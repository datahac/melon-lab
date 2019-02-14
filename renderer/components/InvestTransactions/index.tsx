import React from 'react';
import { withRouter } from 'next/router';
import * as Tm from '@melonproject/token-math';

import ModalTransactions from '+/components/ModalTransactions';

import {
  estimateApproveTransferMutation,
  executeApproveTransferMutation,
} from '~/queries/approve.gql';

import {
  estimateDepositMutation,
  executeDepositMutation,
} from '~/queries/deposit.gql';

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
    const ethToWrap: Tm.BigInteger = props.values
      ? Tm.subtract(props.values.total.quantity, props.wethBalance.quantity)
      : Tm.toBI('0');

    if (Tm.greaterThan(ethToWrap, Tm.toBI('0'))) {
      estimations.push({
        mutation: estimateDepositMutation,
        variables: { quantity: ethToWrap.toString() },
        isComplete: props.step > 1,
        name: 'deposit',
      });
      executions.push({
        mutation: executeDepositMutation,
        isComplete: props.step > 1,
        name: 'deposit',
        refetchQueries: () => ['FundQuery', 'RequestQuery'],
        update: () => {
          props.setStep(2);
        },
      });
    } else {
      props.step === 1 && props.setStep(2);
    }

    estimations.push(
      {
        mutation:
          props.step === 2 ? estimateApproveTransferMutation : estimateNothing,
        variables:
          props.step === 2
            ? {
                fundAddress: props.fundAddress,
                investmentAmount: props.values.total.quantity.toString(),
              }
            : {},
        isComplete: props.step > 2,
        name: 'approveTransfer',
      },
      {
        mutation:
          props.step === 3
            ? estimateRequestInvestmentMutation
            : estimateNothing,
        variables:
          props.step === 3
            ? {
                fundAddress: props.fundAddress,
                investmentAmount: props.values.total.quantity.toString(),
                maxPrice: props.values.price.quote.quantity.toString(),
              }
            : {},
        isComplete: props.step > 3,
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
          props.setStep(3);
        },
      },
      {
        mutation: executeRequestInvestmentMutation,
        variables: {
          fundAddress: props.fundAddress,
        },
        refetchQueries: () => ['FundQuery', 'RequestQuery'],
        update: () => {
          props.setStep(4);
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
