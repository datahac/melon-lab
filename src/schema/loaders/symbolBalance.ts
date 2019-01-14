import * as R from 'ramda';
import * as Tm from '@melonproject/token-math';
import { balanceOf, getTokenBySymbol } from '@melonproject/protocol';

export const getEthBalance = async (environment, address) => {
  const balance = await environment.eth.getBalance(address);
  const token = Tm.createToken('ETH');
  const quantity = Tm.createQuantity(token, balance.toString());
  return quantity;
};

export const getSymbolBalance = R.curryN(3, (environment, symbol, address) => {
  if (symbol === 'ETH') {
    return getEthBalance(environment, address);
  }

  const token = getTokenBySymbol(environment, symbol);
  return (token && balanceOf(environment, token.address, { address })) || null;
});

export default getSymbolBalance;
