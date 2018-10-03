import gql from 'graphql-tag';
import { Mutation } from '~/apollo';

const mutation = gql`
  mutation RestoreWallet($mnemonic: String!, $password: String!) {
    restoreWallet(mnemonic: $mnemonic, password: $password) {
      accountAddress
      privateKey
      encryptedWallet
    }
  }
`;

const cacheQuery = gql`
  query GetWallet {
    accountAddress @client
    privateKey @client
  }
`;

const WalletMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={mutation}
    update={(cache, { data: { restoreWallet } }) => {
      cache.writeQuery({
        query: cacheQuery,
        data: restoreWallet,
      });
    }}
    onCompleted={onCompleted}
  >
    {children}
  </Mutation>
);

export default WalletMutation;
