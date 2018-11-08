import * as R from 'ramda';
import { getRecentTrades } from '@melonproject/melon.js';

function recentTrades(environment, base, quote) {
  return (
    environment &&
    getRecentTrades(environment, {
      baseTokenSymbol: base,
      quoteTokenSymbol: quote,
    })
  );
}

export default R.curryN(2, recentTrades);
