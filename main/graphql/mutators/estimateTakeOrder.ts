import * as R from 'ramda';

import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  Environment,
  takeOrderOnKyber,
  getTokenBySymbol,
  getExpectedRate,
  getOasisDexOrder,
  takeOasisDexOrder,
  take0xOrder,
} from '@melonproject/protocol';

const estimateTakeOrder = async (
  _,
  { from, id, exchange, buyToken, buyQuantity, sellToken },
  { environment, loaders },
) => {
  const env: Environment = withDifferentAccount(
    environment,
    new Tm.Address(from),
  );
  const fund = await loaders.fundAddressFromManager.load(from);
  const { tradingAddress, accountingAddress } = await loaders.fundRoutes.load(
    fund,
  );
  const denominationAsset = await loaders.fundDenominationAsset.load(
    accountingAddress,
  );

  if (exchange === 'OASIS_DEX') {
    const oasisDex = R.path(
      ['deployment', 'thirdPartyContracts', 'exchanges', 'matchingMarket'],
      env,
    );

    const order = await getOasisDexOrder(env, oasisDex, { id });

    const fillTakerQuantity = buyQuantity
      ? Tm.createQuantity(order.buy.token, buyQuantity)
      : order.buy;

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
    const kyberNetworkProxy = R.path(
      [
        'deployment',
        'thirdPartyContracts',
        'exchanges',
        'kyber',
        'kyberNetworkProxy',
      ],
      environment,
    );

    const buy = Tm.createQuantity(getTokenBySymbol(env, buyToken), buyQuantity);

    const rate = await getExpectedRate(env, kyberNetworkProxy, {
      takerAsset: buy.token,
      makerAsset: getTokenBySymbol(env, sellToken),
      fillTakerQuantity: buy,
    });

    const sell = Tm.valueIn(rate, buy);

    const result = await takeOrderOnKyber.prepare(env, tradingAddress, {
      makerQuantity: Tm.createQuantity(sell.token, 0),
      takerQuantity: buy,
    });

    return result && result.rawTransaction;
  }

  if (exchange === 'RADAR_RELAY') {
    const quote = denominationAsset.symbol === sellToken ? sellToken : buyToken;
    const base = denominationAsset.symbol === sellToken ? buyToken : sellToken;
    const orders = await loaders.exchangeOrders.load({
      quote,
      base,
      exchange: 'RADAR_RELAY',
    });

    const orderToTake = orders.find(order => order.id === id);
    const offeredPrice = orderToTake.trade;

    const makerQuantity = Tm.createQuantity(
      getTokenBySymbol(environment, buyToken),
      buyQuantity,
    );

    const takerQuantity = Tm.valueIn(offeredPrice, makerQuantity);

    const result = await take0xOrder.prepare(env, tradingAddress, {
      takerQuantity,
      signedOrder: orderToTake.original.signedOrder,
    });

    return result && result.rawTransaction;
  }

  throw new Error(`Make order not implemented for ${exchange}`);
};

export { estimateTakeOrder };
