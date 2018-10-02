import { providers } from '@melonproject/melon.js';

function getProviderType(environment) {
  const provider = environment.providerType;
  return Object.keys(providers).find(key => providers[key] === provider);
};

export default getProviderType;
