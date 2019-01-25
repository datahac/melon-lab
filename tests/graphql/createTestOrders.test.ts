import * as R from 'ramda';

import * as Tm from '@melonproject/token-math';
import {
  Environment,
  withPrivateKeySigner,
  getTokenBySymbol,
  makeOrderFromAccountOasisDex,
  Exchanges,
} from '@melonproject/protocol';
import {
  allLogsWritten,
  testLogger,
} from '@melonproject/protocol/lib/tests/utils/testLogger';

import { getEnvironment, getWallet } from '~/graphql/environment';

jest.setTimeout(1200000);

describe('Create test orders', () => {
  afterAll(async () => {
    await allLogsWritten();
  });

  it('do it', async () => {
    const environment: Environment = await getEnvironment(testLogger);
    const wallet = await getWallet();
    const master: Environment = await withPrivateKeySigner(
      environment,
      wallet.privateKey,
    );

    const weth: Tm.TokenInterface = getTokenBySymbol(environment, 'WETH');
    const mln: Tm.TokenInterface = getTokenBySymbol(environment, 'MLN');

    const matchingMarket = R.path(
      ['deployment', 'exchangeConfigs', Exchanges.MatchingMarket, 'exchange'],
      environment,
    );

    await makeOrderFromAccountOasisDex(master, matchingMarket, {
      buy: Tm.createQuantity(weth, 0.6),
      sell: Tm.createQuantity(mln, 1),
    });
    await makeOrderFromAccountOasisDex(master, matchingMarket, {
      buy: Tm.createQuantity(weth, 0.65),
      sell: Tm.createQuantity(mln, 1),
    });
    await makeOrderFromAccountOasisDex(master, matchingMarket, {
      buy: Tm.createQuantity(weth, 0.7),
      sell: Tm.createQuantity(mln, 1),
    });

    await makeOrderFromAccountOasisDex(master, matchingMarket, {
      buy: Tm.createQuantity(mln, 1),
      sell: Tm.createQuantity(weth, 0.5),
    });
    await makeOrderFromAccountOasisDex(master, matchingMarket, {
      buy: Tm.createQuantity(mln, 1),
      sell: Tm.createQuantity(weth, 0.45),
    });
    await makeOrderFromAccountOasisDex(master, matchingMarket, {
      buy: Tm.createQuantity(mln, 1),
      sell: Tm.createQuantity(weth, 0.4),
    });
  });
});
