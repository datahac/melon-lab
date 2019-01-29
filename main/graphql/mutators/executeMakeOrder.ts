import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  makeOasisDexOrder,
} from '@melonproject/protocol';

const executeMakeOrder = async (
  _,
  { from, signed, exchange },
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

  if (exchange === 'OASIS_DEX') {
    const result = await makeOasisDexOrder.send(
      env,
      tradingAddress,
      signed.rawTransaction,
    );

    const type = Tm.isEqual(denominationAsset, result.sell.token)
      ? 'BID'
      : 'ASK';

    const trade =
      type === 'BID'
        ? Tm.createPrice(result.buy, result.sell)
        : Tm.createPrice(result.sell, result.buy);

    const volume = Tm.toFixed(trade.quote);

    const order = {
      type,
      trade,
      volume,
      exchange,
      id: result.id,
      price: Tm.toFixed(trade),
      metadata: {
        id: result.id,
        isActive: !result.matched,
      },
    };

    return order;
  }

  throw new Error(`Make order not implemented for ${exchange}`);
};

export { executeMakeOrder };
