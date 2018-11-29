import { Mutation } from '~/apollo';
import gql from 'graphql-tag';
import { fundManagerQuery } from '+/components/FundManagerContext';

const estimateMutation = gql`
  mutation EstimateSetupFund(
    $name: String!
    $exchanges: [String]!
  ) {
    estimateSetupFund(
      name: $name
      exchanges: $exchanges
    ) @from
  }
`;

const executeMutation = gql`
  mutation ExecuteSetupFund(
    $transaction: String!
  ) {
    executeSetupFund(
      unsigned: $transaction
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
