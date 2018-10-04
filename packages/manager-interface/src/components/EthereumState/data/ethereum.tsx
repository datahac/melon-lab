import { Query } from '~/apollo';
import * as R from 'ramda';
import gql from 'graphql-tag';

const accountQuery = gql`
  query WalletQuery {
    wallet {
      encryptedWallet @client
      accountAddress @client
      privateKey @client
    }
  }
`;

const connectionQuery = gql`
  query ConnectionQuery($account: String!, $authenticated: Boolean!) {
    block
    network
    config {
      canonicalPriceFeedAddress
      competitionComplianceAddress
      onlyManagerCompetitionAddress
    }
    status {
      nodeSyncing
      blockOverdue
      priceFeedUp
    }

    usersFund(address: $account)
    eth: balance(address: $account, token: ETH) @include(if: $authenticated)
    weth: balance(address: $account, token: WETH) @include(if: $authenticated)
    mln: balance(address: $account, token: MLN) @include(if: $authenticated)
  }
`;

const resultData = R.propOr({}, 'data');
const accountAddress = R.path(['data', 'wallet', 'accountAddress']);
const privateKey = R.path(['data', 'wallet', 'privateKey']);

const EthereumQuery = ({ children }) => (
  <Query query={accountQuery} ssr={false}>
    {accountProps => {
      const account = accountAddress(accountProps);
      const key = privateKey(accountProps);
      const authenticated = !!account;

      return (
        <Query
          query={connectionQuery}
          variables={{
            account: account || '',
            authenticated,
          }}
        >
          {connectionProps => {
            const data = resultData(connectionProps);

            return children({
              ...data,
              account,
              authenticated,
              privateKey: key,
              loading: accountProps.loading || connectionProps.loading,
            });
          }}
        </Query>
      );
    }}
  </Query>
);

export default EthereumQuery;
