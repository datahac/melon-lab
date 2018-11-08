import * as R from 'ramda';
import { toReadable } from '@melonproject/melon.js';

async function etherBalance(environment, config, address) {
  const symbol = config && config.nativeAssetSymbol;
  const balance =
    environment && (await environment.api.eth.getBalance(address));

  return balance && symbol && toReadable(config, balance, symbol) || null;
}

export default R.curryN(3, etherBalance);
