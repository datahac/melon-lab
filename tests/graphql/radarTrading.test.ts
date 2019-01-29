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

import { OrdersQuery } from '~/queries/orderbook.gql';

import {
  EstimateTakeOrderMutation,
  ExecuteTakeOrderMutation,
} from '~/queries/takeOrder.gql';

// import {
//   SignOrder
// } from '~/queries/'

jest.setTimeout(1200000);

describe('Trade on radar relay', () => {
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
      howMuch: Tm.createQuantity('ETH', 3),
      to: tester.wallet.address,
    });

    weth = getTokenBySymbol(environment, 'WETH');
    mln = getTokenBySymbol(environment, 'MLN');

    const quantity = Tm.createQuantity(weth, 2);

    await deposit(tester, quantity.token.address, undefined, {
      value: quantity.quantity.toString(),
    });

    routes = await setupInvestedTestFund(tester);
    context = await createContext(tester, account);
  });

  it('Radar take', async () => {
    const radarOrders = await execute(schema, OrdersQuery, null, context(), {
      base: 'MLN',
      quote: 'WETH',
      exchange: 'RADAR_RELAY',
    });

    expect(radarOrders.errors).toBeUndefined();
    expect(radarOrders.data).toBeTruthy();

    expect(R.path(['data', 'orders'], radarOrders)).toHaveLength(2);

    const estimateRadarTake = await execute(
      schema,
      EstimateTakeOrderMutation,
      null,
      context(),
      {
        exchange: 'RADAR_RELAY',
        buyToken: 'WETH',
        buyQuantity: Tm.appendDecimals(weth, 1).toString(),
        sellToken: 'MLN',
      },
    );

    expect(estimateRadarTake.errors).toBeUndefined();
    expect(estimateRadarTake.data).toBeTruthy();

    const executeRadarTake = await execute(
      schema,
      ExecuteTakeOrderMutation,
      null,
      context(),
      {
        exchange: 'RADAR_RELAY',
        ...R.path(['data', 'estimate'], estimateRadarTake),
      },
    );

    expect(executeRadarTake.errors).toBeUndefined();
    expect(executeRadarTake.data).toBeTruthy();
    expect(Object.keys(R.path(['data', 'execute'], executeRadarTake))).toEqual(
      expect.arrayContaining([
        'id',
        'trade',
        'price',
        'volume',
        'type',
        'exchange',
      ]),
    );
  });
});
