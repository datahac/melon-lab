import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const mutation = gql`
  mutation ExportWallet($password: String!) {
    exportWallet(password: $password)
  }
`;

const EncryptWalletMutation = ({ onCompleted, children }) => (
  <Mutation mutation={mutation} onCompleted={onCompleted}>
    {children}
  </Mutation>
);

export default EncryptWalletMutation;
