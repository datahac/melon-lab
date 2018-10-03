import { Mutation } from '~/apollo';
import gql from 'graphql-tag';

const mutation = gql`
  mutation createFund($name: String!, $signature: SignatureInput!) {
    createFund(name: $name, signature: $signature) {
      name
    }
  }
`;

const FundMutation = ({ children }) => (
  <Mutation mutation={mutation}>{children}</Mutation>
);

export default FundMutation;
