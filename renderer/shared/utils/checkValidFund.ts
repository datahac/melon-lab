import gql from 'graphql-tag';
import * as R from 'ramda';

export default (apolloClient, address) =>
  apolloClient
    .query({
      skip: !address,
      variables: {
        address,
      },
      query: gql`
        query HasValidFundQuery($address: String!) {
          fund(address: $address) {
            id
            address
          }
        }
      `,
    })
    .then(async ({ data }) => {
      if (R.path(['fund', 'address'], data)) {
        return true;
      }
      return false;
    })
    .catch(() => {
      // Fail gracefully
      return false;
    });
