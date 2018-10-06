import {
  setupFund,
  signTermsAndConditions,
  getWallet,
} from '@melonproject/melon.js';
import takeLast from '../../utils/takeLast';

async function createFund(_, { signed, name, privateKey }, { streams }) {
  const environment = await takeLast(streams.environment$);

  if (!environment) {
    // TODO: Return a proper mutation response object with an error field.
    throw new Error('Environment not ready.');
  }

  if (!signed) {
    // TODO: Return a proper mutation response object with an error field.
    throw new Error('Terms and conditions are not signed.');
  }

  const account = getWallet(privateKey);
  const accountEnvironment = {
    ...environment,
    account,
  };

  const signature = await signTermsAndConditions(accountEnvironment);
  const fund = await setupFund(accountEnvironment, {
    name: name,
    signature,
    exchangeNames: [],
    track: environment.track,
  });

  return fund;
}

export default createFund;
