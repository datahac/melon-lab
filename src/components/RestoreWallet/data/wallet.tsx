import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const mutation = gql`
  mutation RestoreWallet($mnemonic: String!, $password: String!) {
    restoreWallet(mnemonic: $mnemonic, password: $password)
  }
`;

const WalletMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={mutation}
    update={(cache, { data: { restoreWallet } }) => {
      const allAccounts = restoreWallet || null;
      const defaultAccount = (restoreWallet && restoreWallet[0]) || null;

      cache.writeQuery({
        query: gql`
          {
            allAccounts
            defaultAccount
            hasStoredWallet
          }
        `,
        data: {
          // We can safely set this to "true" even on the web client because
          // on the next refresh it will be automatically set to "false" through
          // the defaults anyways.
          hasStoredWallet: true,
          allAccounts,
          defaultAccount,
        },
      });
    }}
    onCompleted={onCompleted}
  >
    {children}
  </Mutation>
);

export default WalletMutation;
