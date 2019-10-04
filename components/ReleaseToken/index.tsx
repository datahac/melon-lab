import * as R from 'ramda';
import React from 'react';
import ModalTransaction from '+/components/ModalTransaction';

import {
  estimateReturnBatchToVaultMutation,
  executeReturnBatchToVaultMutation,
} from '~/queries/returnBatchToVault.gql';
import isSameAddress from '~/utils/isSameAddress';
import { query as HoldingsQuery } from '../ManageTemplate/data/holdings';

export default props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: returnBatchToVault"
    step="returnBatchToVault"
    open={!!props.releaseToken}
    estimate={{
      mutation: estimateReturnBatchToVaultMutation,
      variables: {
        fundAddress: props.fundAddress,
        assets: props.releaseToken && [props.releaseToken],
      },
    }}
    execute={{
      mutation: executeReturnBatchToVaultMutation,
      variables: {
        fundAddress: props.fundAddress,
      },
      update: cache => {
        const data = cache.readQuery({
          query: HoldingsQuery,
          variables: {
            address: props.fundAddress,
          },
        });

        const index = R.compose(
          R.findIndex(item => isSameAddress(item.locked.token.address, props.releaseToken)),
          R.pathOr([], ['fund', 'holdings']),
        )(data);

        if (typeof index !== 'undefined') {
          const lens = R.lensPath(['fund', 'holdings', index, 'locked', 'quantity']);
          const updated = R.set(lens, '0', data);

          cache.writeQuery({
            query: HoldingsQuery,
            data: updated,
            variables: {
              address: props.fundAddress,
            },
          });
        }
      },
      onCompleted: () => {
        props.setReleaseToken(null);
      },
    }}
    handleCancel={() => {
      props.setReleaseToken(null);
    }}
  />
);
