import ModalTransaction from '../ModalTransaction';

import {
  estimateCancelOasisDexOrderMutation,
  executeCancelOasisDexOrderMutation,
} from '~/queries/oasisDex.gql';

export default props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: makeOrder"
    open={!!props.values}
    estimate={{
      mutation: estimateCancelOasisDexOrderMutation,
      variables: () => props.values,
    }}
    execute={{
      mutation: executeCancelOasisDexOrderMutation,
      variables: (_, transaction) => ({
        ...transaction,
      }),
      onCompleted: () => {
        props.unset();
        props.refresh();
      },
    }}
    handleCancel={() => {
      props.unset();
    }}
  />
);
