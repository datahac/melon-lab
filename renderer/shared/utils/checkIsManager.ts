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
        query IsManagerQuery($address: String!) {
          associatedFund @account(arg: "manager") @authenticated
          fund(address: $address) {
            id
            address
          }
        }
      `,
    })
    .then(async ({ data }) => {
      const a = R.path(['fund', 'address'], data);
      const b = R.path(['associatedFund'], data);

      if (a && b && a === b) {
        return true;
      }

      return false;
    })
    .catch(() => {
      // Fail gracefully
      return false;
    });
