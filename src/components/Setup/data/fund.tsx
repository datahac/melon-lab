import { Mutation } from '~/apollo';
import gql from 'graphql-tag';
import { fundManagerQuery } from '+/components/FundManagerContext';

const estimateMutation = gql`
  mutation EstimateSetupFund($name: String!, $exchanges: [String]!) {
    estimateSetupFund(args: { name: $name, exchanges: $exchanges }) @sign @from
  }
`;

const executeMutation = gql`
  mutation ExecuteSetupFund(
    $name: String!
    $exchanges: [String]!
    $transaction: String!
  ) {
    executeSetupFund(
      unsigned: $transaction
      args: { name: $name, exchanges: $exchanges }
    ) @sign @from
  }
`;

export const EstimateSetupMutation = ({ onCompleted, children }) => (
  <Mutation mutation={estimateMutation} onCompleted={onCompleted}>
    {children}
  </Mutation>
);

export const ExecuteSetupMutation = ({ onCompleted, account, children }) => (
  <Mutation
    mutation={executeMutation}
    onCompleted={onCompleted}
    update={(cache, { data: { executeSetupFund } }) => {
      const variables = {
        account,
        authenticated: true,
      };

      const data = cache.readQuery({
        query: fundManagerQuery,
        variables,
      });

      cache.writeQuery({
        query: fundManagerQuery,
        variables,
        data: {
          ...data,
          associatedFund: executeSetupFund,
        },
      });
    }}
  >
    {children}
  </Mutation>
);
