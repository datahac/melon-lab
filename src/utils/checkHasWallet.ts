import gql from 'graphql-tag';

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query WalletQuery {
          hasStoredWallet
        }
      `,
    })
    .then(({ data }) => {
      return data && data.hasStoredWallet;
    })
    .catch(() => {
      // Fail gracefully
      return false;
    });
