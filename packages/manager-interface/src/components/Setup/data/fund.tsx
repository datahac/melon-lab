import { Mutation } from '~/apollo';
import gql from 'graphql-tag';

const mutation = gql`
  mutation createFund($name: String!, $signed: Boolean!, $privateKey: String!) {
    createFund(name: $name, signed: $signed, privateKey: $privateKey) {
      name
    }
  }
`;

const FundMutation = ({ children }) => (
  <Mutation mutation={mutation}>{children}</Mutation>
);

export default FundMutation;
