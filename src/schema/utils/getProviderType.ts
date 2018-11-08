import { providers } from '@melonproject/melon.js';

function getProviderType(environment) {
  const provider = environment && environment.providerType;
  return provider && Object.keys(providers).find(key => providers[key] === provider) || null;
}

export default getProviderType;
