import { Mutation } from '~/apollo';
import gql from 'graphql-tag';
import { fundManagerQuery } from '+/components/FundManagerContext';

const estimateCreateComponentsMutation = gql`
  mutation EstimateCreateComponents($name: String!, $exchanges: [String]!) {
    estimateCreateComponents(name: $name, exchanges: $exchanges) @from {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeCreateComponentsMutation = gql`
  mutation ExecuteCreateComponents(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
  ) {
    executeCreateComponents(
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

const estimateContinueCreationMutation = gql`
  mutation EstimateContinueCreation {
    estimateContinueCreation @from {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

export const EstimateCreateComponentsMutation = ({ onCompleted, children }) => (
  <Mutation mutation={estimateCreateComponentsMutation} onCompleted={onCompleted}>
    {children}
  </Mutation>
);

export const ExecuteCreateComponentsMutation = ({
  onCompleted,
  account,
  children,
}) => (
  <Mutation
    mutation={executeCreateComponentsMutation}
    onCompleted={onCompleted}
    update={(cache, { data: { executeCreateComponents } }) => {
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
          associatedFund: executeCreateComponents,
        },
      });
    }}
  >
    {children}
  </Mutation>
);

export const EstimateContinueCreationMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={estimateContinueCreationMutation}
    onCompleted={onCompleted}
  >
    {children}
  </Mutation>
);
