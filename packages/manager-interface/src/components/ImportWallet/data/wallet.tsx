import gql from 'graphql-tag';
import { Mutation } from '~/apollo';

const mutation = gql`
  mutation loadWallet($file: String!, $password: String!) {
    loadWallet(file: $file, password: $password) {
      address
      privateKey
      encryptedWallet
    }
  }
`;

const cacheQuery = gql`
  query GetAccountAddress {
    accountAddress @client
    privateKey @client
  }
`;

const WalletMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={mutation}
    update={(cache, { data: { loadWallet } }) => {
      localStorage.setItem('wallet:melon.fund', loadWallet.encryptedWallet);
      cache.writeQuery({
        query: cacheQuery,
        data: {
          accountAddress: loadWallet.address,
          privateKey: loadWallet.privateKey,
        },
      });
    }}
    onCompleted={onCompleted}
  >
    {children}
  </Mutation>
);

export default WalletMutation;
