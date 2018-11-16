import gql from 'graphql-tag';
import { Mutation } from '~/apollo';

const mutation = gql`
  mutation GenerateWallet($mnemonic: String!, $password: String!) {
    restoreWallet(mnemonic: $mnemonic, password: $password) @client
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
