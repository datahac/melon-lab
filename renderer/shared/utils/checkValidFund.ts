import gql from 'graphql-tag';
import * as R from 'ramda';

export default (apolloClient, address) =>
  apolloClient
    .query({
      variables: {
        address,
      },
      query: gql`
        query FundQuery($address: String!) {
          fund(address: $address) {
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
