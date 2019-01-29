import axios from 'axios';
import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  makeOasisDexOrder,
  make0xOrder,
  getChainName,
} from '@melonproject/protocol';

const executeMakeOrder = async (
  _,
  { from, signed, exchange, signedOrder },
  { environment, loaders },
) => {
  const fund = await loaders.fundAddressFromManager.load(from);
  const { tradingAddress } = await loaders.fundRoutes.load(fund);
  const env = withDifferentAccount(environment, new Tm.Address(from));
  // const denominationAsset = await loaders.fundDenominationAsset.load(
  //   accountingAddress,
  // );

  if (exchange === 'OASIS_DEX') {
    const result = await makeOasisDexOrder.send(
      env,
      tradingAddress,
      signed.rawTransaction,
    );

    // const type = Tm.isEqual(denominationAsset, result.sell.token)
    //   ? 'BID'
    //   : 'ASK';

    // const trade =
    //   type === 'BID'
    //     ? Tm.createPrice(result.buy, result.sell)
    //     : Tm.createPrice(result.sell, result.buy);

    // const volume = Tm.toFixed(trade.quote);

    // const order = {
    //   type,
    //   trade,
    //   volume,
    //   exchange,
    //   id: result.id,
    //   price: Tm.toFixed(trade),
    //   metadata: {
    //     id: result.id,
    //     isActive: !result.matched,
    //   },
    // };

    return !!result;
  }

  if (exchange === 'RADAR_RELAY') {
    const result = await make0xOrder.send(
      env,
      tradingAddress,
      signed.rawTransaction,
    );

    const chain = await getChainName(env);

    if (chain === 'kovan') {
      await axios.post(
        'https://api.kovan.radarrelay.com/v2/orders',
        JSON.parse(signedOrder),
      );
    } else if (chain === 'mainnet') {
      await axios.post(
        'https://api.radarrelay.com/v2/orders',
        JSON.parse(signedOrder),
      );
    } else {
      console.log(
        'POST https://api.radarrelay.com/v2/orders',
        JSON.parse(signedOrder),
      );
    }

    return result;
  }

  throw new Error(`Make order not implemented for ${exchange}`);
};

export { executeMakeOrder };
