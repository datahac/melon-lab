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

  const fund = await setupFund(
    args.name,
    signature,
    exchangeNames,
    environment.track,
  );

  return fund;
}

export default createFund;
