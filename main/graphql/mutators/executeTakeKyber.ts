import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  takeOrderOnKyber,
  TakeOrderOnKyberResult,
} from '@melonproject/protocol';

const executeTakeKyber = async (
  _,
  { from, signed },
  { environment, loaders },
) => {
  const fund = await loaders.fundAddressFromManager.load(from);
  const { tradingAddress, accountingAddress } = await loaders.fundRoutes.load(
    fund,
  );
  const env = withDifferentAccount(environment, new Tm.Address(from));
  const denominationAsset = await loaders.fundDenominationAsset.load(
    accountingAddress,
  );

  const result: TakeOrderOnKyberResult = await takeOrderOnKyber.send(
    env,
    tradingAddress,
    signed.rawTransaction,
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
    id: result.id,
    price: Tm.toFixed(trade),
    exchange: 'KYBER_NETWORK',
  };

  return res;
};

export { executeTakeKyber };
