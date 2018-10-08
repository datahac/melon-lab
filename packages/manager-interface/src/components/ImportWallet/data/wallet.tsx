import gql from 'graphql-tag';
import { Mutation } from '~/apollo';

const mutation = gql`
  mutation DecryptWallet($file: String!, $password: String!) {
    decryptWallet(wallet: $file, password: $password) @client {
      encryptedWallet
      accountAddress
      privateKey
    }
  }
`;

const cacheQuery = gql`
  query GetWallet {
    wallet @client {
      encryptedWallet
      accountAddress
      privateKey
    }
  }
`;

const WalletMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={mutation}
    update={(cache, { data: { decryptWallet } }) => {
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
