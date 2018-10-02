import { Mutation } from '~/apollo';
import gql from 'graphql-tag';

const mutation = gql`
  mutation restoreWallet($mnemonic: String!, $password: String!) {
    restoreWallet(mnemonic: $mnemonic, password: $password) {
      address
      privateKey
      encryptedWallet
    }
  }
`;

const query = gql`
  query getWallet {
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
        query,
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
