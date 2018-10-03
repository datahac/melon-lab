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
      accountAddress @client
      privateKey @client
      encryptedWallet @client
    }
  }
`;

const WalletMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={mutation}
    update={(cache, { data: { restoreWallet } }) => {
      localStorage.setItem('wallet:melon:fund', restoreWallet.encryptedWallet);

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
