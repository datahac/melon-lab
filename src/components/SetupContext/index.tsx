import React from 'react';
import Composer from 'react-composer';
import gql from 'graphql-tag';
import { Query } from '~/apollo';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import * as R from 'ramda';

const defaults = {
  setupBegin: false,
  accountingAddress: false,
  feeManagerAddress: false,
  participationAddress: false,
  policyManagerAddress: false,
  sharesAddress: false,
  tradingAddress: false,
  vaultAddress: false,
  setupComplete: false,
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
            R.values(R.path(['data', 'routes'], setup)),
          );

          const hasRoutes =
            !R.isEmpty(routesValues) &&
            routesValues.every(item => item !== null);

          const isComplete = R.path(['data', 'fund', 'isComplete'], setup);

          const setupInProgress =
            !R.isEmpty(routesValues) &&
            (routesValues.every(item => item === null) ||
              routesValues.some(item => item === null)) &&
            !!manager.fund;

          const data = {
            setupBegin: !manager.fund && !setupInProgress && !isComplete,
            setupInProgress,
            setupComplete: hasRoutes && !isComplete,
            accountingAddress: !!R.path(
              ['data', 'routes', 'accountingAddress'],
              setup,
            ),
            feeManagerAddress: !!R.path(
              ['data', 'routes', 'feeManagerAddress'],
              setup,
            ),
            participationAddress: !!R.path(
              ['data', 'routes', 'participationAddress'],
              setup,
            ),
            policyManagerAddress: !!R.path(
              ['data', 'routes', 'policyManagerAddress'],
              setup,
            ),
            sharesAddress: !!R.path(['data', 'routes', 'sharesAddress'], setup),
            tradingAddress: !!R.path(
              ['data', 'routes', 'tradingAddress'],
              setup,
            ),
            vaultAddress: !!R.path(['data', 'routes', 'vaultAddress'], setup),
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
