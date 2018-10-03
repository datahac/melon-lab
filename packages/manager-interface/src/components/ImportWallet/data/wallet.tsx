import gql from 'graphql-tag';
import { Mutation } from '~/apollo';

const mutation = gql`
  mutation DecryptWallet($file: String!, $password: String!) {
    decryptWallet(wallet: $file, password: $password) {
      encryptedWallet
      accountAddress
      privateKey
    }
  }
`;

const cacheQuery = gql`
  query GetWallet {
    wallet {
      encryptedWallet @client
      accountAddress @client
      privateKey @client
    }
  }
`;

const WalletMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={mutation}
    update={(cache, { data: { decryptWallet } }) => {
      localStorage.setItem('wallet:melon:fund', decryptWallet.encryptedWallet);

      cache.writeQuery({
        query: cacheQuery,
        data: {
          wallet: decryptWallet,
        },
      });
    }}
    onCompleted={onCompleted}
  >
    {children}
  </Mutation>
);

export default WalletMutation;
