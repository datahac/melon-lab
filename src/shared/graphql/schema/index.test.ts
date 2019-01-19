import { execute } from 'graphql/execution';
import gql from 'graphql-tag';
import { schema } from '~/shared/graphql/schema';
import { createContext } from '~/shared/graphql/schema/context';
import { getEnvironment, getWallet } from '~/shared/graphql/schema/environment';

describe('graphql schema', () => {
  let context;

  beforeAll(async () => {
    const environment = await getEnvironment();
    const wallet = await getWallet();
    context = await createContext(environment, wallet);
  });

  it('returns the ranking', async () => {
    const query = gql`
      query {
        rankings {
          id
        }
      }
    `;

    const result = await execute(schema, query, null, context());
    console.log(JSON.stringify(result));
  });
});
