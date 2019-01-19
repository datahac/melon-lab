import gql from 'graphql-tag';
import { Mutation } from '~/shared/graphql/apollo';

const mutation = gql`
  mutation GenerateMnemonic {
    generateMnemonic
  }
`;

const MnemonicQuery = ({ children }) => (
  <Mutation mutation={mutation}>{children}</Mutation>
);

export default MnemonicQuery;
