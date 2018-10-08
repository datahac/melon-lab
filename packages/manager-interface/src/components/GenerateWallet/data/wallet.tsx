import gql from 'graphql-tag';
import { Mutation } from '~/apollo';

const mutation = gql`
  mutation GenerateWallet($mnemonic: String!, $password: String!) {
    restoreWallet(mnemonic: $mnemonic, password: $password) @client {
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
    update={(cache, { data: { restoreWallet } }) => {
      cache.writeQuery({
        query: cacheQuery,
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
