import { getVersionContract } from '@melonproject/melon.js';

async function termsAndConditions(environment) {
  const versionContract = environment && await getVersionContract(environment);
  const arrayifiedHash = versionContract && await versionContract.instance.TERMS_AND_CONDITIONS.call();
  return arrayifiedHash || null;
}

export default termsAndConditions;
