import React from 'react';
import gql from 'graphql-tag';
import { Query } from '~/apollo';

const defaults = {
  canonicalPriceFeedAddress: null,
  competitionComplianceAddress: null,
  onlyManagerCompetitionAddress: null,
  noComplianceAddress: null,
};

export const ConfigurationContext = React.createContext(defaults);

export const configurationQuery = gql`
  query ConfigurationQuery {
    canonicalPriceFeedAddress: versionConfig(key: CANONICAL_PRICE_FEED_ADDRESS)
    competitionComplianceAddress: versionConfig(
      key: COMPETITION_COMPLIANCE_ADDRESS
    )
    onlyManagerCompetitionAddress: versionConfig(
      key: ONLY_MANAGER_COMPETITION_ADDRESS
    )
    noComplianceAddress: versionConfig(key: NO_COMPLIANCE_ADDRESS)
  }
`;

export class ConfigurationProvider extends React.PureComponent {
  render() {
    return (
      <Query query={configurationQuery}>
        {props => (
          <ConfigurationContext.Provider
            value={{
              ...defaults,
              ...props.data,
            }}
          >
            {this.props.children}
          </ConfigurationContext.Provider>
        )}
      </Query>
    );
  }
}

export const ConfigurationConsumer = ConfigurationContext.Consumer;
