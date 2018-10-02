import { getRecentTrades } from '@melonproject/melon.js';

async function recentTrades(parent, args, context) {
  const { environment } = context;
  const { baseTokenSymbol, quoteTokenSymbol } = args;
  const trades = await getRecentTrades(environment, {
    baseTokenSymbol,
    quoteTokenSymbol,
  });
  return trades;
}

export default recentTrades;
