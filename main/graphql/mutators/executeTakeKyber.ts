import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, takeOrderOnKyber } from '@melonproject/protocol';

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

  const result = await takeOrderOnKyber.send(
    env,
    tradingAddress,
    signed.rawTransaction,
  );

  console.log(JSON.stringify(result, null, 2));

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
    exchange: 'KYBER_NETWORK',
  };

  return res;
};

export { executeTakeKyber };
