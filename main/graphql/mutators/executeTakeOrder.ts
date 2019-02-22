import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  takeOrderOnKyber,
  TakeOrderOnKyberResult,
  takeOasisDexOrder,
  take0xOrder,
  takeEngineOrder,
} from '@melonproject/protocol';

const executeTakeOrder = async (
  _,
  { from, signedOrNot, exchange },
  { environment, loaders },
) => {
  const transaction = signedOrNot.rawTransaction
    ? signedOrNot.rawTransaction
    : signedOrNot;

  const fund = await loaders.fundAddressFromManager.load(from);
  const { tradingAddress, accountingAddress } = await loaders.fundRoutes.load(
    fund,
  );
  const env = withDifferentAccount(environment, new Tm.Address(from));
  const denominationAsset = await loaders.fundDenominationAsset.load(
    accountingAddress,
  );

  if (exchange === 'OASIS_DEX') {
    const result = await takeOasisDexOrder.send(
      env,
      tradingAddress,
      transaction,
    );

    const type = Tm.isEqual(denominationAsset, result.sell.token)
      ? 'BUY'
      : 'SELL';

    const trade =
      type === 'BUY'
        ? Tm.createPrice(result.buy, result.sell)
        : Tm.createPrice(result.sell, result.buy);

    const volume = Tm.toFixed(trade.quote);

    const res = {
      type,
      trade,
      volume,
      id: result.id,
      price: Tm.toFixed(trade),
      exchange: 'OASIS_DEX',
    };

    return res;
  }

  if (exchange === 'KYBER_NETWORK') {
    const result: TakeOrderOnKyberResult = await takeOrderOnKyber.send(
      env,
      tradingAddress,
      transaction,
    );

    const type = Tm.isEqual(denominationAsset, result.takerQuantity.token)
      ? 'BUY'
      : 'SELL';

    const trade =
      type === 'BUY'
        ? Tm.createPrice(result.makerQuantity, result.takerQuantity)
        : Tm.createPrice(result.takerQuantity, result.makerQuantity);

    const volume = Tm.toFixed(trade.quote);

    const res = {
      type,
      trade,
      volume,
      price: Tm.toFixed(trade),
      exchange: 'KYBER_NETWORK',
    };

    return res;
  }

  if (exchange === 'RADAR_RELAY') {
    const result = await take0xOrder.send(env, tradingAddress, transaction);

    const type = Tm.isEqual(denominationAsset, result.takerFilledAmount.token)
      ? 'BUY'
      : 'SELL';

    const trade =
      type === 'BUY'
        ? Tm.createPrice(result.makerFilledAmount, result.takerFilledAmount)
        : Tm.createPrice(result.takerFilledAmount, result.makerFilledAmount);

    const volume = Tm.toFixed(trade.quote);

    const res = {
      type,
      trade,
      volume,
      price: Tm.toFixed(trade),
      exchange: 'RADAR_RELAY',
    };

    return res;
  }

  if (exchange === 'MELON_ENGINE') {
    await takeEngineOrder.send(env, tradingAddress, transaction);
    return;
  }

  throw new Error(`Make order not implemented for ${exchange}`);
};

export { executeTakeOrder };
