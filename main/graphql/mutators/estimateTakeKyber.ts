import * as R from 'ramda';

import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  Environment,
  takeOrderOnKyber,
  getTokenBySymbol,
  getExpectedRate,
} from '@melonproject/protocol';

const estimateTakeKyber = async (
  _,
  { from, buyToken, buyQuantity, sellToken },
  { environment, loaders },
) => {
  const env: Environment = withDifferentAccount(
    environment,
    new Tm.Address(from),
  );
  const fund = await loaders.fundAddressFromManager.load(from);
  const { tradingAddress } = await loaders.fundRoutes.load(fund);
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
};

export { estimateTakeKyber };
