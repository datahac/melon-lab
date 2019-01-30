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

import {
  EstimateMakeOrderMutation,
  ExecuteMakeOrderMutation,
} from '~/queries/makeOrder.gql';

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

    const orders = R.path(['data', 'orders'], radarOrders);

    expect(orders.length).toBeGreaterThan(0);

    // We need an ASK order to take because fund has only WETH
    const bidOrderToTake = orders.find(o => o.type === 'ASK');

    const estimateRadarTake = await execute(
      schema,
      EstimateTakeOrderMutation,
      null,
      context(),
      {
        id: bidOrderToTake.id,
        exchange: 'RADAR_RELAY',
        buyToken: 'MLN',
        buyQuantity: bidOrderToTake.metadata.makerAssetAmount,
        sellToken: 'WETH',
        sellQuantity: bidOrderToTake.metadata.takerAssetAmount,
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

  it('Radar make', async () => {
    const buy = Tm.createQuantity(mln, 7.5);
    const sell = Tm.createQuantity(weth, 0.5);

    const estimateMakeOrder = await execute(
      schema,
      EstimateMakeOrderMutation,
      null,
      context(),
      {
        exchange: 'RADAR_RELAY',
        buyToken: buy.token.symbol,
        buyQuantity: buy.quantity.toString(),
        sellToken: sell.token.symbol,
        sellQuantity: sell.quantity.toString(),
      },
    );

    expect(estimateMakeOrder.errors).toBeUndefined();
    expect(estimateMakeOrder.data).toBeTruthy();

    const result = await execute(
      schema,
      ExecuteMakeOrderMutation,
      null,
      context(),
      {
        exchange: 'RADAR_RELAY',
        ...R.path(['data', 'estimate'], estimateMakeOrder),
      },
    );

    expect(result.errors).toBeUndefined();
    expect(result.data).toBeTruthy();
  });
});
