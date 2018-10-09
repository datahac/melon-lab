import { Mutation } from '~/apollo';
import gql from 'graphql-tag';

const mutation = gql`
  mutation prepareSetupFund($name: String!, $account: String!, $signature: SignatureInput!) {
    prepareSetupFund(account: $account, name: $name, signature: $signature)
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
    update={(cache, { data: { prepareSetupFund } }) => {
      // cache.writeQuery({
      //   query,
      //   variables: {
      //     account,
      //   },
      //   data: {
      //     associatedFund: prepareSetupFund.address,
      //   },
      // });
    }}
    onCompleted={({ createFund }) => onCompleted(createFund.address)}
  >
    {children}
  </Mutation>
);

export default FundMutation;
