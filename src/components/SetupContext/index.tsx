import React from 'react';
import Composer from 'react-composer';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import * as R from 'ramda';

const defaults = {
  setupBegin: false,
  setupComplete: false,
  setupInProgress: false,
  isComplete: false,
  update: () => {
    throw new Error('Cannot set the fund status.');
  },
};

export const SetupContext = React.createContext(defaults);

export const fundQuery = gql`
  query FundQuery($address: String!) {
    fund(address: $address) {
      id
      isComplete
      isShutdown
    }
  }
`;

export const SetupProvider = ({ children }) => (
  <Composer
    components={[
      <FundManagerConsumer />,
      ({ results: [manager], render }) => (
        <Query
          query={fundQuery}
          variables={{
            address: manager.fund,
          }}
          skip={!manager.fund}
          ssr={false}
          errorPolicy="all"
          children={render}
        />
      ),
    ]}
  >
    {([manager, setup]) => {
      const routesValues = R.without(['Routes'], R.values(R.path(['routes'], manager)));

      const hasRoutes = !R.isEmpty(routesValues) && routesValues.every(item => item !== null);

      const isComplete = R.path(['data', 'fund', 'isComplete'], setup);

      const setupInProgress =
        !R.isEmpty(routesValues) &&
        (routesValues.every(item => item === null) || routesValues.some(item => item === null)) &&
        !!manager.fund;

      const data = {
        setupBegin: !manager.fund && !setupInProgress && !isComplete,
        setupInProgress,
        setupComplete: hasRoutes && !isComplete,
        isComplete,
      };

      const value = {
        ...data,
        update: (cache, values) => {
          cache.writeQuery({
            query: fundQuery,
            variables: {
              address: manager.fund,
            },
            skip: !manager.fund,
            data: {
              ...R.path(['data'], setup),
              fund: {
                ...R.path(['data', 'fund'], setup),
                ...values.fund,
              },
            },
          });
        },
      };

      return (
        <SetupContext.Provider
          value={{
            ...defaults,
            ...value,
          }}
        >
          {children}
        </SetupContext.Provider>
      );
    }}
  </Composer>
);

export const SetupConsumer = SetupContext.Consumer;
