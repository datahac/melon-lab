import React from 'react';
import * as R from 'ramda';
import ModalTransaction from '+/components/ModalTransaction';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';

const estimateFundSetupCompleteMutation = gql`
  mutation EstimateFundSetupComplete {
    estimate: estimateFundSetupComplete @from {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeFundSetupCompleteMutation = gql`
  mutation ExecuteFundSetupComplete(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
  ) {
    execute: executeFundSetupComplete(
      unsigned: {
        data: $data
        from: $from
        gas: $gas
        gasPrice: $gasPrice
        to: $to
        value: $value
      }
    ) @sign @from
  }
`;

export default withRouter(props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: completeSetup"
    open={props.progress === 8}
    estimate={{
      mutation: estimateFundSetupCompleteMutation,
    }}
    execute={{
      mutation: executeFundSetupCompleteMutation,
      update: (cache, result) => {
        props.update(cache, {
          step: 9,
          fund: R.path(['data', 'execute'], result),
        });
      },
      onCompleted: () => {
        props.router.push({
          pathname: '/invest',
          query: {
            address: props.fund,
          },
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
