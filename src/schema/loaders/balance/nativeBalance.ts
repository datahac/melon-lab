import * as R from 'ramda';
import { getBalance } from '@melonproject/melon.js';

function nativeBalance(environment, config, address) {
  const symbol = config && config.nativeAssetSymbol;

  return (
    environment &&
    symbol &&
    getBalance(environment, {
      tokenSymbol: symbol,
      ofAddress: address,
    })
  );
}

export default R.curryN(3, nativeBalance);
