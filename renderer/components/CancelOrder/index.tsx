import ModalTransaction from '../ModalTransaction';

import {
  EstimateCancelOasisDexOrderMutation,
  ExecuteCancelOasisDexOrderMutation,
} from '~/queries/cancelOasisDexOrder.gql';

export default props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: makeOrder"
    open={!!props.values}
    estimate={{
      mutation: EstimateCancelOasisDexOrderMutation,
      variables: () => props.values,
    }}
    execute={{
      mutation: ExecuteCancelOasisDexOrderMutation,
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
