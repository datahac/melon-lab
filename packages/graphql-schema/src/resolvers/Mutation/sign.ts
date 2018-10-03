import { signTermsAndConditions, getWallet } from '@melonproject/melon.js';

async function sign(parent, args, context) {
  const { environment } = context;
  environment.account = getWallet(args.privateKey);
  const signature = await signTermsAndConditions(environment);
  return signature;
}

export default sign;
