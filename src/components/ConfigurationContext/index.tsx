import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const defaults = {
  melonContracts: {
    priceSource: null,
  },
};

export const ConfigurationContext = React.createContext(defaults);

export const configurationQuery = gql`
  query ConfigurationQuery {
    contractDeployment {
      melonContracts {
        priceSource
      }
    }
  }
`;

export const ConfigurationProvider = ({ children }) => (
  <Query query={configurationQuery} ssr={false} errorPolicy="all">
    {props => (
      <ConfigurationContext.Provider
        value={{
          ...defaults,
          ...props.data.contractDeployment,
        }}
      >
        {children}
      </ConfigurationContext.Provider>
    )}
  </Query>
);

export const ConfigurationConsumer = ConfigurationContext.Consumer;
