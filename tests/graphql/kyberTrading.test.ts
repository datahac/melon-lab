import * as R from 'ramda';
import Accounts from 'web3-eth-accounts';
import { execute } from 'graphql/execution';

import * as Tm from '@melonproject/token-math';
import {
  Environment,
  withPrivateKeySigner,
  sendEth,
  getTokenBySymbol,
  deposit,
} from '@melonproject/protocol';
import {
  allLogsWritten,
  testLogger,
} from '@melonproject/protocol/lib/tests/utils/testLogger';
import { setupInvestedTestFund } from '@melonproject/protocol/lib/tests/utils/setupInvestedTestFund';

import { getEnvironment, getWallet } from '~/graphql/environment';
import { createContext } from '~/graphql/context';
import { schema } from '~/graphql/schema';

import {
  estimateTakeKyberMutation,
  executeTakeKyberMutation,
} from '~/queries/kyberTrade.gql';

jest.setTimeout(90 * 1000);

describe('Take orders from kyber', () => {
  let environment: Environment;
  let context;
  let routes;
  let weth: Tm.TokenInterface;
  let mln: Tm.TokenInterface;

  afterAll(async () => {
    await allLogsWritten();
  });

  beforeAll(async () => {
    environment = await getEnvironment(testLogger);
    const wallet = await getWallet();
    const accounts = new Accounts(environment.eth.currentProvider);
    const account = accounts.create();
    const master = await withPrivateKeySigner(environment, wallet.privateKey);
    const tester = await withPrivateKeySigner(environment, account.privateKey);

    await sendEth(master, {
      howMuch: Tm.createQuantity('ETH', 100),
      to: tester.wallet.address,
    });

    weth = getTokenBySymbol(environment, 'WETH');
    mln = getTokenBySymbol(environment, 'MLN');

    const quantity = Tm.createQuantity(weth, 10);

    await deposit(tester, quantity.token.address, undefined, {
      value: quantity.quantity.toString(),
    });

    routes = await setupInvestedTestFund(tester);
    context = await createContext(tester, account);
  });

  it('Kyber take', async () => {
    const estimateKyberTake = await execute(
      schema,
      estimateTakeKyberMutation,
      null,
      context(),
      {
        buyToken: 'WETH',
        buyQuantity: Tm.appendDecimals(weth, 1).toString(),
        sellToken: 'MLN',
      },
    );

    expect(estimateKyberTake.errors).toBeUndefined();
    expect(estimateKyberTake.data).toBeTruthy();

    const executeKyberTake = await execute(
      schema,
      executeTakeKyberMutation,
      null,
      context(),
      {
        ...R.path(['data', 'estimate'], estimateKyberTake),
      },
    );

    expect(executeKyberTake.errors).toBeUndefined();
    expect(executeKyberTake.data).toBeTruthy();
    expect(Object.keys(R.path(['data', 'execute'], executeKyberTake))).toEqual(
      expect.arrayContaining([
        'id',
        'trade',
        'price',
        'volume',
        'type',
        'exchange',
      ]),
    );

    console.log(JSON.stringify(estimateKyberTake, null, 2));
  });
});
