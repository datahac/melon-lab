import gql from 'graphql-tag';
import { Mutation } from '~/apollo';
import { downloadWallet } from '~/utils/createDownload';

const mutation = gql`
  mutation ExportWallet($password: String!) {
    exportWallet(password: $password) @client
  }
`;

const EncryptWalletMutation = ({ router, account, children }) => (
  <Mutation mutation={mutation} onCompleted={(data) => {
    const wallet = data && data.exportWallet;

    downloadWallet(wallet, account).then(() => {
      router.replace({
        pathname: '/wallet',
      });
    });
  }}>
    {children}
  </Mutation>
);

export default EncryptWalletMutation;
