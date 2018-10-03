import {
  setupFund,
  signTermsAndConditions,
  getWallet,
} from '@melonproject/melon.js';

async function createFund(parent, args, context) {
  const { environment } = context;

  if (!args.signed) {
    throw Error('Terms and conditions are not signed');
  }

  environment.account = getWallet(args.privateKey);
  const signature = await signTermsAndConditions(environment);

  let exchangeNames = [];
  if (true) exchangeNames.push('MatchingMarket');
  if (true) exchangeNames.push('ZeroExExchange');
  if (true) exchangeNames.push('KyberNetworkProxy');

  console.log(args.name, signature, exchangeNames, environment.track)

  const fund = await setupFund(args.name, signature, exchangeNames, environment.track);

  console.log(fund)

  return fund;
}

export default createFund;
