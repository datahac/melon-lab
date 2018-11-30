import { Mutation } from '~/apollo';
import gql from 'graphql-tag';
import { fundManagerQuery } from '+/components/FundManagerContext';

const estimateMutation = gql`
  mutation EstimateSetupFund($name: String!, $exchanges: [String]!) {
    estimateSetupFund(name: $name, exchanges: $exchanges) @from {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeMutation = gql`
  mutation ExecuteSetupFund(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
  ) {
    executeSetupFund(
      unsigned: {
        data: $data
        from: $from
        gas: $gas
        gasPrice: $gasPrice
        to: $to
        value: $value
      }
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
