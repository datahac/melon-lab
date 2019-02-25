import axios from 'axios';
import * as R from 'ramda';
import * as web3Utils from 'web3-utils';

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
  getWrapperLock,
  makeEthfinexOrder,
  Environment,
} from '@melonproject/protocol';
import { WalletTypes } from '../context';

const withHardwareSigner = (environment: Environment, account: Tm.Address) => {
  const signMessage = async message => {
    const signature = await environment.eth.personal.sign(
      message,
      account.toString(),
    );
    const { v, r, s } = web3Utils.getSignatureParameters(signature) as any;
    const messageHash = web3Utils.soliditySha3(message);
    return {
      message,
      messageHash,
      signature,
      v,
      r,
      s,
    };
  };

  const withWallet = {
    ...environment,
    wallet: {
      signMessage,
      address: account,
    },
  };

  return withWallet;
};

const estimateMakeOrder = async (
  _,
  { from, exchange, buyToken, buyQuantity, sellToken, sellQuantity },
  { loaders },
) => {
  const environment = await loaders.environment();
  const fund = await loaders.fundAddressFromManager.load(from);
  const { tradingAddress } = await loaders.fundRoutes.load(fund);
  const env = withDifferentAccount(environment, new Tm.Address(from));

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

    try {
      // TODO: Refactor this into a directive
      const wallet = loaders.getWallet();
      const walletType = loaders.getWalletType();
      const networkName = await loaders.networkName();

      const withSigner =
        walletType === WalletTypes.HARDWARE
          ? await withHardwareSigner(environment, wallet.address)
          : await withPrivateKeySigner(environment, wallet.privateKey);

      const orderFromProtocol = await createOrder(env, zeroExAddress, {
        makerQuantity,
        takerQuantity,
        makerAddress: tradingAddress,
        // feeRecipientAddress: unsignedOrder.feeRecipientAddress,
      });

      // See: https://github.com/0xProject/standard-relayer-api/blob/master/http/v2.md#payload
      const payload = {
        makerAddress: orderFromProtocol.makerAddress,
        takerAddress: orderFromProtocol.takerAddress,
        makerAssetAmount: orderFromProtocol.makerAssetAmount,
        takerAssetAmount: orderFromProtocol.takerAssetAmount,
        makerAssetData: orderFromProtocol.makerAssetAmount,
        takerAssetData: orderFromProtocol.takerAssetData,
        exchangeAddress: orderFromProtocol.exchangeAddress,
        expirationTimeSeconds: orderFromProtocol.expirationTimeSeconds,
      };

      /*
      response = {
          "senderAddress": "0xa2b31dacf30a9c50ca473337c01d8a201ae33e32",
          "feeRecipientAddress": "0xb046140686d052fff581f63f8136cce132e857da",
          "makerFee": "100000000000000",
          "takerFee": "200000000000000"
      }
      */
      const response = await axios.post(
        `https://api${
          networkName !== 'LIVE' ? '.kovan' : ''
        }.radarrelay.com/0x/v2/order_config`,
        payload,
      );

      const unsignedOrder = {
        ...orderFromProtocol,
        ...response.data,
      };

      const signedOrder = await signOrder(withSigner, unsignedOrder);

      const result = await make0xOrder.prepare(env, tradingAddress, {
        signedOrder,
      });

      return (
        result && {
          ...result.rawTransaction,
          signedOrder: JSON.stringify(stringifyStruct(signedOrder)),
        }
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  if (exchange === 'ETHFINEX') {
    const wrapperRegistryEfx = R.path(
      [
        'deployment',
        'thirdPartyContracts',
        'exchanges',
        'ethfinex',
        'wrapperRegistryEFX',
      ],
      env,
    );
    const ethfinexAddress = R.path(
      ['deployment', 'exchangeConfigs', Exchanges.Ethfinex, 'exchange'],
      env,
    );
    // TODO: Refactor this into a directive
    const wallet = loaders.getWallet();
    const walletType = loaders.getWalletType();

    const withSigner =
      walletType === WalletTypes.HARDWARE
        ? await withHardwareSigner(environment, wallet.address)
        : await withPrivateKeySigner(environment, wallet.privateKey);

    const wrappedMakerToken = await getWrapperLock(env, wrapperRegistryEfx, {
      token: makerQuantity.token,
    });
    const wrappedMakerQuantity = Tm.createQuantity(
      wrappedMakerToken,
      makerQuantity.quantity,
    );
    const unsignedOrder = await createOrder(env, ethfinexAddress, {
      takerQuantity,
      makerAddress: tradingAddress,
      makerQuantity: wrappedMakerQuantity,
    });
    const signedOrder = await signOrder(withSigner, unsignedOrder);
    const result = await makeEthfinexOrder.prepare(env, tradingAddress, {
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
