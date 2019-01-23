import { Environment, getTokenBySymbol } from '@melonproject/protocol';
import {
  allLogsWritten,
  testLogger,
} from '@melonproject/protocol/lib/tests/utils/testLogger';
import * as Tm from '@melonproject/token-math';
import { execute } from 'graphql/execution';

import { schema } from '~/graphql/schema';
import { getEnvironment } from '~/graphql/environment';
import { createContext } from '~/graphql/context';

import * as rankingsQuery from '~/queries/rankings.gql';
import * as kyberPriceQuery from '~/queries/kyberPrice.gql';

describe('Queries that work without a fund', () => {
  let environment: Environment;
  let context;

  // let weth: Tm.TokenInterface;
  let mln: Tm.TokenInterface;

  afterAll(async () => {
    await allLogsWritten();
  });

  beforeAll(async () => {
    environment = await getEnvironment(testLogger);

    // weth = getTokenBySymbol(environment, 'WETH');
    mln = getTokenBySymbol(environment, 'MLN');

    context = await createContext(environment);
  });

  it.skip('Ranking', async () => {
    const result = await execute(schema, rankingsQuery, null, context());
    expect(result.errors).toBeUndefined();
    expect(result.data).toBeTruthy();
  });

  it('Kyber price', async () => {
    const quantity = Tm.createQuantity(mln, 10);

    const result = await execute(schema, kyberPriceQuery, null, context(), {
      symbol: quantity.token.symbol,
      quantity: quantity.quantity.toString(),
      type: 'BUY',
    });

    console.log(JSON.stringify(result, null, 2));
  });
});
