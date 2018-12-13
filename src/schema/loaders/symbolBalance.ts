import * as R from 'ramda';
import { balanceOf } from '@melonproject/protocol';
import * as tokenMath from '@melonproject/token-math';

export const extractQuantity = quantity => {
  return quantity && quantity.quantity.toString();
};

export const getEthBalance = async (environment, address) => {
  const balance = await environment.eth.getBalance(address);
  const quantity = tokenMath.quantity.createQuantity('ETH', balance.toString());
  return quantity;
};

export const getTokenBalance = async (environment, symbol, address) => {
  const token = environment.deployment.thirdPartyContracts.tokens.find(
    item => item.symbol === symbol,
  );
  const quantity = await balanceOf(environment, token.address, { address });
  return quantity;
};

export const getSymbolBalance = R.curryN(
  3,
  async (environment, symbol, address) => {
    const quantity =
      symbol === 'ETH'
        ? await getEthBalance(environment, address)
        : await getTokenBalance(environment, symbol, address);

    return {
      quantity: extractQuantity(quantity),
      token: {
        decimals: quantity.token.decimals,
        symbol: quantity.token.symbol,
        address: quantity.token.address,
      },
    };
  },
);

export default getSymbolBalance;
