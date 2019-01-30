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

  if (exchange === 'OASIS_DEX') {
    const result = await makeOasisDexOrder.send(
      env,
      tradingAddress,
      signed.rawTransaction,
    );

    return !!result;
  }

  if (exchange === 'RADAR_RELAY') {
    const result = await make0xOrder.send(
      env,
      tradingAddress,
      signed.rawTransaction,
    );

    const chain = await getChainName(env);
    const parsedOrder = JSON.parse(signedOrder);

    if (chain === 'kovan') {
      await axios.post(
        'https://api.kovan.radarrelay.com/v2/orders',
        parsedOrder,
      );
    } else if (chain === 'mainnet') {
      await axios.post('https://api.radarrelay.com/v2/orders', parsedOrder);
    } else {
      console.log('POST https://api.radarrelay.com/v2/orders', parsedOrder);
    }

    return result;
  }

  throw new Error(`Make order not implemented for ${exchange}`);
};

export { executeMakeOrder };
