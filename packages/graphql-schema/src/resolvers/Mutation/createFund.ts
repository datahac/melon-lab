import { setupFund } from '@melonproject/melon.js';

async function createFund(parent, args, context) {
  const { environment, config, track } = context;

  console.log(args);

  let exchangeNames = [];
  if (true) exchangeNames.push('MatchingMarket');
  if (true) exchangeNames.push('ZeroExExchange');
  if (true) exchangeNames.push('KyberNetworkProxy');
  const fund = await setupFund(args.name, args.signature, exchangeNames, track);
  console.log(fund);

  return;
}

export default createFund;
