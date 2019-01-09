import React from 'react';
import Composer from 'react-composer';
import gql from 'graphql-tag';
import { Query } from '~/apollo';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import * as R from 'ramda';

const defaults = {
  isComplete: null,
  isShutdown: null,
  isInProgress: null,
  routes: null,
  update: () => {
    throw new Error('Cannot set the fund status.');
  },
};

export const SetupContext = React.createContext(defaults);

export const fundQuery = gql`
  query FundQuery($address: String!) {
    fund(address: $address) {
      isComplete
      isShutdown
    }
    routes @account(arg: "manager") @authenticated {
      accountingAddress
      feeManagerAddress
      participationAddress
      policyManagerAddress
      sharesAddress
      tradingAddress
      vaultAddress
    }
  }
`;

export class SetupProvider extends React.PureComponent {
  render() {
    return (
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
              children={render}
            />
          ),
        ]}
      >
        {([manager, setup]) => {
          const routesValues = R.without(
            ['Routes'],
            R.values(R.pathOr(false, ['data', 'routes'], setup)),
          );
          const isInProgress =
            (routesValues.every(item => item === null) ||
              routesValues.some(item => item === null)) &&
            !!manager.fund;

          const isComplete = R.pathOr(
            false,
            ['data', 'fund', 'isComplete'],
            setup,
          );

          const isShutdown = R.pathOr(
            false,
            ['data', 'fund', 'isShutdown'],
            setup,
          );

          const routes = R.pathOr(null, ['data', 'routes'], setup);

          const data = {
            isComplete,
            isShutdown,
            isInProgress,
            routes,
          };

          const value = {
            ...data,
            updateExistingFund: (cache, values) => {
              cache.writeFragment({
                id: `fund:${manager.fund}`,
                fragment: gql`
                  fragment myFund on Fund {
                    isShutdown
                    isComplete
                  }
                `,
                data: {
                  ...R.pathOr({}, ['data', 'fund'], setup),
                  ...values,
                },
              });
            },
            update: (cache, values) => {
              cache.writeQuery({
                query: fundQuery,
                variables: {
                  address: manager.fund,
                },
                skip: !manager.fund,
                data: {
                  ...R.path(['data'], setup),
                  routes: {
                    ...R.path(['data', 'routes'], setup),
                    ...values.routes,
                  },
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
              {this.props.children}
            </SetupContext.Provider>
          );
        }}
      </Composer>
    );
  }
}

export const SetupConsumer = SetupContext.Consumer;
