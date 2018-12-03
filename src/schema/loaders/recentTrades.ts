import * as R from 'ramda';

function recentTrades(environment, base, quote) {
  // TODO: Implement this again.
  return null;
  // return (
  //   environment &&
  //   getRecentTrades(environment, {
  //     baseTokenSymbol: base,
  //     quoteTokenSymbol: quote,
  //   })
  // );
}

export default R.curryN(2, recentTrades);
