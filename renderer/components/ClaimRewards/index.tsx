import React from 'react';
import ModalTransaction from '+/components/ModalTransaction';
import gql from 'graphql-tag';

const estimateTriggerRewardAllFeesMutation = gql`
  mutation EstimateTriggerRewardAllFees($fundAddress: String!) {
    estimate: estimateTriggerRewardAllFees(fundAddress: $fundAddress) @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeTriggerRewardAllFeesMutation = gql`
  mutation ExecuteTriggerRewardAllFees(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
    $fundAddress: String!
  ) {
    execute: executeTriggerRewardAllFees(
      fundAddress: $fundAddress
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

export default props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: triggerRewardAllFees"
    step="triggerRewardAllFees"
    open={props.claimRewards}
    estimate={{
      mutation: estimateTriggerRewardAllFeesMutation,
      variables: {
        fundAddress: props.fundAddress,
      },
    }}
    execute={{
      mutation: executeTriggerRewardAllFeesMutation,
      variables: {
        fundAddress: props.fundAddress,
      },
      onCompleted: () => {
        props.setClaimRewards(false);
      },
    }}
    handleCancel={props.setClaimRewards}
  />
);
