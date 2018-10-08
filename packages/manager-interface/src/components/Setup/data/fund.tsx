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
    usersFund(address: $account)
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
          usersFund: createFund.address,
        },
      });
    }}
    onCompleted={({ createFund }) => onCompleted(createFund.address)}
  >
    {children}
  </Mutation>
);

export default FundMutation;
