import React from 'react';
import * as R from 'ramda';
import ModalTransaction from '+/components/ModalTransaction';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';

const estimateFundSetupBeginMutation = gql`
  mutation EstimateFundSetupBegin(
    $name: String!
    $exchanges: [String]!
    $performanceFee: Float!
    $managementFee: Float!
  ) {
    estimate: estimateFundSetupBegin(
      name: $name
      exchanges: $exchanges
      performanceFee: $performanceFee
      managementFee: $managementFee
    ) @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeFundSetupBeginMutation = gql`
  mutation ExecuteFundSetupBegin(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
  ) {
    execute: executeFundSetupBegin(
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

export default withRouter(props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: beginSetup"
    open={!!props.values && props.progress}
    estimate={{
      mutation: estimateFundSetupBeginMutation,
      variables: () => ({
        name: props.values.name,
        exchanges: props.values.exchanges,
        performanceFee: props.values.fees.performanceFee,
        managementFee: props.values.fees.managementFee,
      }),
    }}
    execute={{
      mutation: executeFundSetupBeginMutation,
      update: (cache, result) => {
        props.update(cache, {
          fund: R.path(['data', 'execute'], result),
        });
      },
    }}
    handleCancel={() => {
      props.router.push({
        pathname: '/wallet',
      });
    }}
  />
));
