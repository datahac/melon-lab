import gql from 'graphql-tag';

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query FundQuery {
          associatedFund @account(arg: "manager") @authenticated
        }
      `,
    })
    .then(({ data }) => {
      return data && !!data.associatedFund;
    })
    .catch(() => {
      // Fail gracefully
      return false;
    });
