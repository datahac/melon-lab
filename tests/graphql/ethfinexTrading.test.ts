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
  EstimateMakeOrderMutation,
  ExecuteMakeOrderMutation,
} from '~/queries/makeOrder.gql';

import {
  EstimateCancelOrderMutation,
  ExecuteCancelOrderMutation,
} from '~/queries/cancelOrder.gql';

import * as OpenOrdersQuery from '~/queries/openOrders.gql';

// import {
//   SignOrder
// } from '~/queries/'

jest.setTimeout(1200000);

describe('Trade on Ethfinex', () => {
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

  it('Ethfinex make', async () => {
    const buy = Tm.createQuantity(mln, 7.5);
    const sell = Tm.createQuantity(weth, 0.5);

    const estimateMakeOrder = await execute(
      schema,
      EstimateMakeOrderMutation,
      null,
      context(),
      {
        exchange: 'ETHFINEX',
        buyToken: buy.token.symbol,
        buyQuantity: buy.quantity.toString(),
        sellToken: sell.token.symbol,
        sellQuantity: sell.quantity.toString(),
      },
    );

    expect(estimateMakeOrder.errors).toBeUndefined();
    expect(estimateMakeOrder.data).toBeTruthy();
    const executeMakeOrder = await execute(
      schema,
      ExecuteMakeOrderMutation,
      null,
      context(),
      {
        exchange: 'ETHFINEX',
        ...R.path(['data', 'estimate'], estimateMakeOrder),
      },
    );

    expect(executeMakeOrder.errors).toBeUndefined();
    expect(executeMakeOrder.data).toBeTruthy();
  });

  it('Ethfinex cancel', async () => {
    const openOrders = await execute(schema, OpenOrdersQuery, null, context(), {
      fundAddress: routes.hubAddress,
    });

    expect(openOrders.errors).toBeUndefined();
    expect(openOrders.data).toBeTruthy();

    const orderToCancel = R.pathOr([], ['data', 'openOrders'], openOrders).find(
      order =>
        order.type === 'BID' &&
        order.trade.quote.token.symbol === 'WETH' &&
        order.exchange === 'RADAR_RELAY', // TODO: Should be ETHFINEX
    );

    expect(orderToCancel).toBeTruthy();

    const estimateCancelOrder = await execute(
      schema,
      EstimateCancelOrderMutation,
      null,
      context(),
      {
        id: orderToCancel.id,
        exchange: 'ETHFINEX',
      },
    );

    expect(estimateCancelOrder.errors).toBeUndefined();
    expect(estimateCancelOrder.data).toBeTruthy();

    const executeCancelOrder = await execute(
      schema,
      ExecuteCancelOrderMutation,
      null,
      context(),
      {
        exchange: 'ETHFINEX',
        ...R.path(['data', 'estimate'], estimateCancelOrder),
      },
    );

    expect(executeCancelOrder.errors).toBeUndefined();
    expect(executeCancelOrder.data).toBeTruthy();
  });
});
