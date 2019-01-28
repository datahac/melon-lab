import gql from 'graphql-tag';
import * as R from 'ramda';

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query FundQuery {
          associatedFund @account(arg: "manager") @authenticated
        }
      `,
    })
    .then(async ({ data }) => {
      if (data && !!data.associatedFund) {
        const fundData = await apolloClient.query({
          variables: data && {
            address: data.associatedFund,
          },
          query: gql`
            query FundQuery($address: String!) {
              fund(address: $address) {
                isComplete
              }
            }
          `,
        });

        return (
          data.associatedFund &&
          R.path(['data', 'fund', 'isComplete'], fundData)
        );
      }

      return false;
    })
    .catch(() => {
      // Fail gracefully
      return false;
    });
