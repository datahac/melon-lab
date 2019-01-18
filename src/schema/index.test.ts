import { execute } from 'graphql/execution';
import gql from 'graphql-tag';
import { schema, createContext } from './';

const environment = await getEnvironment(track, endpoint);
// Automatically log in to a wallet. Useful for development.
const wallet =
  process.env.NODE_ENV === 'development' &&
  !!JSON.parse(process.env.SERVER_SIDE_WALLET || 'false')
    ? Wallet.Wallet.fromMnemonic(mnemonic)
    : null;

// Bootstrap the graphql server.
const context = await createContext(environment, wallet);

describe(() => {
  let context;

  beforeAll(async () => {
    // TODO: Build environment / wallet.
    context = await createContext(environment, wallet);
  });

  it(async () => {
    const variables = {};
    const query = gql`
      ...
    `;

    const result = await execute(schema, query, null, context, variables);
  });
});
