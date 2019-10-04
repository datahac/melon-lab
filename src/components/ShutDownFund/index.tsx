import React from 'react';
import ModalTransaction from '+/components/ModalTransaction';

import { estimateShutDownFund, executeShutDownFund } from '~/queries/shutDownFund.gql';

export default props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: shutDownFund"
    step="shutDownFund"
    open={props.shutDown}
    estimate={{
      mutation: estimateShutDownFund,
      variables: {
        fundAddress: props.fundAddress,
      },
    }}
    execute={{
      mutation: executeShutDownFund,
      variables: {
        fundAddress: props.fundAddress,
      },
      update: cache => {
        props.update(cache, {
          fund: {
            isShutdown: true,
          },
        });
      },
      onCompleted: () => {
        props.setShutDown(false);
      },
    }}
    handleCancel={() => {
      props.setShutDown(false);
    }}
  />
);
