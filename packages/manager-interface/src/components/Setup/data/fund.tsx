import { Mutation } from '~/apollo';
import gql from 'graphql-tag';

const prepareMutation = gql`
  mutation PrepareSetupFund($name: String!) {
    prepareSetupFund(name: $name) @client
  }
`;

const executeMutation = gql`
  mutation ExecuteSetupFund($transaction: Json!) {
    executeSetupFund(transaction: $transaction) @client
  }
`;

export const PrepareSetupMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={prepareMutation}
    onCompleted={({ prepareSetupFund }) => onCompleted(prepareSetupFund)}
  >
    {children}
  </Mutation>
);

export const ExecuteSetupMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={executeMutation}
    update={(cache, { data: { executeSetupFund } }) => {
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
    onCompleted={({ executeSetupFund }) => onCompleted(executeSetupFund)}
  >
    {children}
  </Mutation>
);
