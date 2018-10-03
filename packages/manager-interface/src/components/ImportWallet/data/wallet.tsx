import gql from 'graphql-tag';
import { Mutation } from '~/apollo';

const mutation = gql`
  mutation LoadWallet($file: String!, $password: String!) {
    loadWallet(file: $file, password: $password) {
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
    update={(cache, { data: { loadWallet } }) => {
      cache.writeQuery({
        query: cacheQuery,
        data: loadWallet,
      });
    }}
    onCompleted={onCompleted}
  >
    {children}
  </Mutation>
);

export default WalletMutation;
