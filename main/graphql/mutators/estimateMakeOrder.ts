import * as R from 'ramda';
import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  getTokenBySymbol,
  makeOasisDexOrder,
  createOrder,
  withPrivateKeySigner,
  make0xOrder,
  Exchanges,
  signOrder,
  stringifyStruct,
} from '@melonproject/protocol';
import { getWallet } from '../environment';

const estimateMakeOrder = async (
  _,
  { from, exchange, buyToken, buyQuantity, sellToken, sellQuantity },
  { environment, loaders },
) => {
  const fund = await loaders.fundAddressFromManager.load(from);
  const { tradingAddress } = await loaders.fundRoutes.load(fund);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  // TODO: Refactor this into a directive
  const wallet = await getWallet();
  const withSigner = await withPrivateKeySigner(environment, wallet.privateKey);

  const makerQuantity = Tm.createQuantity(
    getTokenBySymbol(environment, sellToken),
    sellQuantity,
  );
  const takerQuantity = Tm.createQuantity(
    getTokenBySymbol(environment, buyToken),
    buyQuantity,
  );

  if (exchange === 'OASIS_DEX') {
    const result = await makeOasisDexOrder.prepare(env, tradingAddress, {
      makerQuantity,
      takerQuantity,
    });

    return result && result.rawTransaction;
  }

  if (exchange === 'RADAR_RELAY') {
    const zeroExAddress = R.path(
      ['deployment', 'exchangeConfigs', Exchanges.ZeroEx, 'exchange'],
      env,
    );

    const order = await createOrder(env, zeroExAddress, {
      makerQuantity,
      takerQuantity,
      makerAddress: tradingAddress,
    });

    const signedOrder = await signOrder(withSigner, order);

    const result = await make0xOrder.prepare(env, tradingAddress, {
      signedOrder,
    });

    return (
      result && {
        ...result.rawTransaction,
        signedOrder: JSON.stringify(stringifyStruct(signedOrder)),
      }
    );
  }

  throw new Error(`Make order not implemented for ${exchange}`);
};

export { estimateMakeOrder };
