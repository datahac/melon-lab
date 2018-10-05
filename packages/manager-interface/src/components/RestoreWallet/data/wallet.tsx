import { Mutation } from '~/apollo';
import gql from 'graphql-tag';

const mutation = gql`
  mutation RestoreWallet($mnemonic: String!, $password: String!) {
    restoreWallet(mnemonic: $mnemonic, password: $password) {
      accountAddress
      privateKey
      encryptedWallet
    }
  }
`;

const query = gql`
  query GetWallet {
    wallet {
      accountAddress
      privateKey
      encryptedWallet
    }
  }
`;

const WalletMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={mutation}
    update={(cache, { data: { restoreWallet } }) => {
      cache.writeQuery({
        query,
        data: {
          wallet: restoreWallet,
        },
      });
    }}
    onCompleted={onCompleted}
  >
    {children}
  </Mutation>
);

export default WalletMutation;
