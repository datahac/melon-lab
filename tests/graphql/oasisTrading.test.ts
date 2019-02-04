import { execute } from 'graphql/execution';
import * as R from 'ramda';
import Accounts from 'web3-eth-accounts';

import {
  deposit,
  Environment,
  Exchanges,
  getActiveOasisDexOrders,
  getTokenBySymbol,
  makeOrderFromAccountOasisDex,
  sendEth,
  withPrivateKeySigner,
} from '@melonproject/protocol';
import {
  allLogsWritten,
  testLogger,
} from '@melonproject/protocol/lib/tests/utils/testLogger';
import * as Tm from '@melonproject/token-math';
import { schema } from '~/graphql/schema';
import { createContext } from '~/graphql/context';
import { getEnvironment, getWallet } from '~/graphql/environment';

import {
  EstimateMakeOrderMutation,
  ExecuteMakeOrderMutation,
} from '~/queries/makeOrder.gql';

import {
  EstimateTakeOrderMutation,
  ExecuteTakeOrderMutation,
} from '~/queries/takeOrder.gql';

import {
  EstimateCancelOrderMutation,
  ExecuteCancelOrderMutation,
} from '~/queries/cancelOrder.gql';

import * as OpenOrdersQuery from '~/queries/openOrders.gql';
import { setupInvestedTestFund } from '@melonproject/protocol/lib/tests/utils/setupInvestedTestFund';

jest.setTimeout(1200000);

describe('Setup fund and trade on Oasis Dex', () => {
  let environment: Environment;
  let master: Environment;
  let context;
  let fundAddress;
  let weth: Tm.TokenInterface;
  let mln: Tm.TokenInterface;
  let matchingMarket: Tm.Address;
  let matchingMarketAccessor: Tm.Address;

  afterAll(async () => {
    await allLogsWritten();
  });

  beforeAll(async () => {
    environment = await getEnvironment(testLogger);
    const wallet = await getWallet();
    const accounts = new Accounts(environment.eth.currentProvider);
    const account = accounts.create();
    master = await withPrivateKeySigner(environment, wallet.privateKey);
    const tester = await withPrivateKeySigner(environment, account.privateKey);

    matchingMarket = R.path(
      ['deployment', 'exchangeConfigs', Exchanges.MatchingMarket, 'exchange'],
      environment,
    );
    matchingMarketAccessor = R.path(
      ['deployment', 'melonContracts', 'adapters', 'matchingMarketAccessor'],
      environment,
    );

    await sendEth(master, {
      howMuch: Tm.createQuantity('ETH', 2),
      to: tester.wallet.address,
    });

    weth = getTokenBySymbol(environment, 'WETH');
    mln = getTokenBySymbol(environment, 'MLN');

    const quantity = Tm.createQuantity(weth, 1);

    await deposit(tester, quantity.token.address, undefined, {
      value: quantity.quantity.toString(),
    });

    const routes = await setupInvestedTestFund(tester);
    fundAddress = routes.hubAddress;
    context = await createContext(tester, account);
  });

  it('Oasis make order', async () => {
    const preOrders = await getActiveOasisDexOrders(
      environment,
      matchingMarketAccessor,
      {
        targetExchange: matchingMarket,
        buyAsset: mln.address,
        sellAsset: weth.address,
      },
    );

    const buy = Tm.createQuantity(mln, 7.5);
    const sell = Tm.createQuantity(weth, 0.5);

    const estimateMakeOrder = await execute(
      schema,
      EstimateMakeOrderMutation,
      null,
      context(),
      {
        exchange: 'OASIS_DEX',
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
        exchange: 'OASIS_DEX',
        ...R.path(['data', 'estimate'], estimateMakeOrder),
      },
    );

    expect(result.errors).toBeUndefined();
    expect(result.data).toBeTruthy();

    const postOrders = await getActiveOasisDexOrders(
      environment,
      matchingMarketAccessor,
      {
        targetExchange: matchingMarket,
        sellAsset: weth.address,
        buyAsset: mln.address,
      },
    );

    // TODO: Fix meta data return
    // console.log(JSON.stringify(result, null, 2));
    // expect(R.path(['data', 'metadata'], result)).toBeTruthy()

    // if (R.path(['data', 'metadata', 'isActive'], result)) {
    //   expect(postOrders.length).toBeGreaterThan(preOrders.length);
    // } else {
    //   expect(postOrders.length).toBe(preOrders.length);
    // }
    expect(postOrders.length >= preOrders.length).toBe(true);

    const openOrders = await execute(schema, OpenOrdersQuery, null, context(), {
      fundAddress,
    });

    expect(openOrders.errors).toBeUndefined();
    expect(openOrders.data).toBeTruthy();
  });

  it('Cancel oasisdex order', async () => {
    const openOrders = await execute(schema, OpenOrdersQuery, null, context(), {
      fundAddress,
    });

    expect(openOrders.errors).toBeUndefined();
    expect(openOrders.data).toBeTruthy();

    const orderToCancel = R.pathOr([], ['data', 'openOrders'], openOrders).find(
      order =>
        order.type === 'BID' &&
        order.trade.quote.token.symbol === 'WETH' &&
        order.exchange === 'OASIS_DEX',
    );

    expect(orderToCancel).toBeTruthy();

    const estimateCancelOrder = await execute(
      schema,
      EstimateCancelOrderMutation,
      null,
      context(),
      {
        id: orderToCancel.id,
        exchange: 'OASIS_DEX',
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
        exchange: 'OASIS_DEX',
        ...R.path(['data', 'estimate'], estimateCancelOrder),
      },
    );

    expect(executeCancelOrder.errors).toBeUndefined();
    expect(executeCancelOrder.data).toBeTruthy();
  });

  it('Oasis take order', async () => {
    const buy = Tm.createQuantity(weth, 0.1);
    const sell = Tm.createQuantity(mln, 2);

    const orderFromAccount = await makeOrderFromAccountOasisDex(
      master,
      matchingMarket,
      { buy, sell },
    );

    const orders = await getActiveOasisDexOrders(
      environment,
      matchingMarketAccessor,
      {
        targetExchange: matchingMarket,
        buyAsset: buy.token.address,
        sellAsset: sell.token.address,
      },
    );

    const orderInOrderbook = orders.find(
      order => orderFromAccount.id === order.id,
    );

    if (!orderFromAccount.matched) {
      expect(orderInOrderbook).toBeTruthy();
    }

    const orderToTake = orderFromAccount.matched ? orders[0] : orderFromAccount;

    const estimateTakeOrder = await execute(
      schema,
      EstimateTakeOrderMutation,
      null,
      context(),
      {
        id: `${orderToTake.id}`,
        exchange: 'OASIS_DEX',
        // buyQuantity: buy.quantity.toString(),
        sellQuantity: buy.quantity.toString(),
      },
    );

    expect(estimateTakeOrder.errors).toBeUndefined();
    expect(estimateTakeOrder.data).toBeTruthy();

    const executeTakeOrder = await execute(
      schema,
      ExecuteTakeOrderMutation,
      null,
      context(),
      {
        exchange: 'OASIS_DEX',
        ...R.path(['data', 'estimate'], estimateTakeOrder),
      },
    );

    expect(executeTakeOrder.errors).toBeUndefined();
    expect(executeTakeOrder.data).toBeTruthy();
    expect(Object.keys(R.path(['data', 'execute'], executeTakeOrder))).toEqual(
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
