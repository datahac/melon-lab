import React from 'react';
import ModalTransaction from '+/components/ModalTransaction';
import gql from 'graphql-tag';
import { query as fundQuery } from '+/components/ManageTemplate/data/fund';

const estimateShutDownFundMutation = gql`
  mutation EstimateShutDownFund($fundAddress: String!) {
    estimate: estimateShutDownFund(fundAddress: $fundAddress) @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeShutDownFundMutation = gql`
  mutation ExecuteShutDownFund(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
    $fundAddress: String!
  ) {
    execute: executeShutDownFund(
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
    text="The following method on the Melon Smart Contracts will be executed: shutDownFund"
    open={props.shutDown}
    estimate={{
      mutation: estimateShutDownFundMutation,
      variables: () => ({
        fundAddress: props.fundAddress,
      }),
    }}
    execute={{
      mutation: executeShutDownFundMutation,
      variables: (_, transaction) => ({
        ...transaction,
        fundAddress: props.fundAddress,
      }),
      update: cache => {
        cache.writeFragment({
          id: `fund:${props.fundAddress}`,
          fragment: gql`
            fragment myFund on Fund {
              isShutdown
            }
          `,
          data: {
            __typename: 'Fund',
            isShutdown: true,
          },
        });
      },
      onCompleted: () => {
        props.setShutDown();
      },
    }}
    handleCancel={() => props.setShutDown()}
  />
);
