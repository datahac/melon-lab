import { Mutation } from '~/apollo';
import gql from 'graphql-tag';

const mutation = gql`
  mutation createFund($name: String!, $privateKey: String!) {
    createFund(name: $name, privateKey: $privateKey) {
      address
    }
  }
`;

const query = gql`
  query ConnectionQuery($account: String!) {
    associatedFund(address: $account) {
      address
    }
  }
`;

const FundMutation = ({ onCompleted, account, children }) => (
  <Mutation
    mutation={mutation}
    update={(cache, { data: { createFund } }) => {
      cache.writeQuery({
        query,
        variables: {
          account,
        },
        data: {
          associatedFund: createFund.address,
        },
      });
    }}
    onCompleted={({ createFund }) => onCompleted(createFund.address)}
  >
    {children}
  </Mutation>
);

export default FundMutation;
