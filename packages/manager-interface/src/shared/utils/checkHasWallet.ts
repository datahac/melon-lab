import gql from 'graphql-tag';

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query WalletQuery {
          wallet {
            encryptedWallet
            accountAddress
            privateKey
          }
        }
      `,
    })
    .then(({ data }) => {
      return { hasWallet: data };
    })
    .catch(() => {
      // Fail gracefully
      return { hasWallet: {} };
    });
