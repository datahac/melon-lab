import gql from 'graphql-tag';
import { Mutation } from '~/apollo';

const mutation = gql`
  mutation restoreWallet($mnemonic: String!, $password: String!) {
    restoreWallet(mnemonic: $mnemonic, password: $password) {
      address
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
      localStorage.setItem('wallet:melon.fund', restoreWallet.encryptedWallet);
      cache.writeQuery({
        query: cacheQuery,
        data: {
          accountAddress: restoreWallet.address,
          privateKey: restoreWallet.privateKey,
        },
      });
    }}
    onCompleted={onCompleted}
  >
    {children}
  </Mutation>
);

export default WalletMutation;
