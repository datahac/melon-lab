import * as R from 'ramda';

import * as Tm from '@melonproject/token-math';
import {
  createOrder,
  withPrivateKeySigner,
  getTokenBySymbol,
  Exchanges,
  signOrder,
  stringifyStruct,
  approveOrder,
} from '@melonproject/protocol';
import { getEnvironment, getWallet } from '../environment';
import { testLogger } from '@melonproject/protocol/lib/tests/utils/testLogger';

const exchangeMap = {
  [Exchanges.ZeroEx]: 'RADAR_RELAY',
  [Exchanges.Ethfinex]: 'ETHFINEX',
};

const testOrders = {};

const getTestOrders = async (base, quote, exchange: Exchanges) => {
  if (testOrders[`${base}:${quote}:${exchange}`]) {
    return testOrders[`${base}:${quote}:${exchange}`];
  }

  const environment = await getEnvironment(testLogger);
  const wallet = await getWallet();
  const maker = await withPrivateKeySigner(environment, wallet.privateKey);

  const baseToken = getTokenBySymbol(environment, base);
  const quoteToken = getTokenBySymbol(environment, quote);

  const exchangeAddress = R.path(
    ['deployment', 'exchangeConfigs', exchange, 'exchange'],
    environment,
  );

  const bidTrade = {
    makerQuantity: Tm.createQuantity(baseToken, 1),
    takerQuantity: Tm.createQuantity(quoteToken, 0.5),
  };

  const askTrade = {
    makerQuantity: Tm.createQuantity(quoteToken, 0.55),
    takerQuantity: Tm.createQuantity(baseToken, 1),
  };

  const bid = await createOrder(maker, exchangeAddress, bidTrade);
  const ask = await createOrder(maker, exchangeAddress, askTrade);

  const signedBid = await signOrder(maker, bid);
  const signedAsk = await signOrder(maker, ask);

  await approveOrder(maker, exchangeAddress, bid);
  await approveOrder(maker, exchangeAddress, ask);

  testOrders[`${base}:${quote}:${exchange}`] = [
    {
      id: signedBid.signature,
      exchange: exchangeMap[exchange],
      type: 'BID',
      trade: {
        base: bidTrade.makerQuantity,
        quote: bidTrade.takerQuantity,
      },
      original: {
        signedOrder: stringifyStruct(signedBid),
      },
    },
    {
      id: signedAsk.signature,
      exchange: exchangeMap[exchange],
      type: 'ASK',
      trade: {
        base: askTrade.takerQuantity,
        quote: askTrade.makerQuantity,
      },
      original: {
        signedOrder: stringifyStruct(signedAsk),
      },
    },
  ];

  return testOrders[`${base}:${quote}:${exchange}`];
};

export { getTestOrders };
