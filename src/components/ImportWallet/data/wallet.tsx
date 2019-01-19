import gql from 'graphql-tag';
import { Mutation } from '~/shared/graphql/apollo';

const mutation = gql`
  mutation ImportWallet($file: String!, $password: String!) {
    importWallet(wallet: $file, password: $password)
  }
`;

const WalletMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={mutation}
    update={(cache, { data: { importWallet } }) => {
      const allAccounts = importWallet || null;
      const defaultAccount = (importWallet && importWallet[0]) || null;

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
