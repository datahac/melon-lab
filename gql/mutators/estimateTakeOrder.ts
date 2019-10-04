import * as R from 'ramda';

import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  Environment,
  takeOrderOnKyber,
  getTokenBySymbol,
  getOasisDexOrder,
  takeOasisDexOrder,
  take0xOrder,
  takeEngineOrder,
} from '@melonproject/protocol';

const estimateTakeOrder = async (
  _,
  { from, id, exchange, buyToken, buyQuantity, sellToken, sellQuantity },
  { loaders },
) => {
  const environment = await loaders.environment();

  const env: Environment = withDifferentAccount(environment, new Tm.Address(from));
  const fund = await loaders.fundAddressFromManager.load(from);
  const { tradingAddress, accountingAddress } = await loaders.fundRoutes.load(fund);
  const denominationAsset = await loaders.fundDenominationAsset.load(accountingAddress);

  if (exchange === 'OASIS_DEX') {
    const oasisDex = R.path(['deployment', 'thirdPartyContracts', 'exchanges', 'matchingMarket'], env);

    const order = await getOasisDexOrder(env, oasisDex, { id });

    const fillTakerQuantity = Tm.createQuantity(order.buy.token, sellQuantity);

    const result = await takeOasisDexOrder.prepare(env, tradingAddress, {
      id,
      fillTakerQuantity,
      makerQuantity: order.sell,
      takerQuantity: order.buy,
      maker: order.owner,
    });

    return result && result.rawTransaction;
  }

  if (exchange === 'KYBER_NETWORK') {
    const buy = Tm.createQuantity(getTokenBySymbol(env, buyToken), buyQuantity);
    const sell = Tm.createQuantity(getTokenBySymbol(env, sellToken), sellQuantity);

    const result = await takeOrderOnKyber.prepare(env, tradingAddress, {
      makerQuantity: buy,
      takerQuantity: sell,
    });

    return result && result.rawTransaction;
  }

  if (exchange === 'RADAR_RELAY') {
    const base = denominationAsset.symbol === sellToken ? buyToken : sellToken;
    const quote = denominationAsset.symbol === sellToken ? sellToken : buyToken;

    const orders = await loaders.exchangeOrders.load({
      base,
      quote,
      exchange: 'RADAR_RELAY',
    });

    const orderToTake = orders.find(order => order.id === id);

    const takerToken = getTokenBySymbol(env, sellToken);
    const takerQuantity = Tm.createQuantity(takerToken, sellQuantity);

    const result = await take0xOrder.prepare(env, tradingAddress, {
      takerQuantity,
      signedOrder: orderToTake.original.signedOrder,
    });

    return result && result.rawTransaction;
  }

  if (exchange === 'MELON_ENGINE') {
    const makerToken = getTokenBySymbol(env, buyToken);
    const takerToken = getTokenBySymbol(env, sellToken);

    const result = await takeEngineOrder.prepare(env, tradingAddress, {
      makerQuantity: Tm.createQuantity(makerToken, buyQuantity),
      takerQuantity: Tm.createQuantity(takerToken, sellQuantity),
    });

    return result && result.rawTransaction;
  }

  throw new Error(`Make order not implemented for ${exchange}`);
};

export { estimateTakeOrder };
