import gql from 'graphql-tag';
import { Query } from '~/apollo';

const query = gql`
  query GetMnemonic {
    mnemonic
  }
`;

const MnemonicQuery = ({ children }) => (
  <Query query={query} ssr={false} fetchPolicy="network-only">
    {children}
  </Query>
);

export default MnemonicQuery;
