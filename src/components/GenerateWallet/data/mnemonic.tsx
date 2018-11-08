import gql from 'graphql-tag';
import { Mutation } from '~/apollo';

const mutation = gql`
  mutation GenerateMnemonic {
    generateMnemonic @client
  }
`;

const MnemonicQuery = ({ children }) => (
  <Mutation mutation={mutation}>
    {children}
  </Mutation>
);

export default MnemonicQuery;
