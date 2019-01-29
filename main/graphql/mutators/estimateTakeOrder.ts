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
  const { tradingAddress } = await loaders.fundRoutes.load(fund);

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

  throw new Error(`Make order not implemented for ${exchange}`);
};

export { estimateTakeOrder };
