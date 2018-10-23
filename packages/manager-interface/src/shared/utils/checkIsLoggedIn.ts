import gql from 'graphql-tag';

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query IsLoggedInQuery {
          defaultAccount @client
        }
      `,
    })
    .then(({ data }) => {
      return data && data.defaultAccount;
    })
    .catch(() => {
      // Fail gracefully
      return false;
    });
