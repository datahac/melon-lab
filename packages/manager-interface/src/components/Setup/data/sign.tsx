import { Mutation } from '~/apollo';
import gql from 'graphql-tag';

const mutation = gql`
  mutation Sign($privateKey: String!) {
    sign(privateKey: $privateKey) {
      r
      s
      v
    }
  }
`;

const SignMutation = ({ onCompleted, children }) => (
  <Mutation mutation={mutation} onCompleted={onCompleted}>{children}</Mutation>
);

export default SignMutation;
