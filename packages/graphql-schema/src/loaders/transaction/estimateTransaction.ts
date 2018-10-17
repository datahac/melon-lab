import {
  gasBoost,
  getConfig,
  getVersionContract,
} from '@melonproject/melon.js';

const estimateTransaction = async (
  environment,
  method,
  parameters,
  options,
) => {
  const config = await getConfig(environment);
  const contract = await getVersionContract(environment, config);
  const fn = contract.instance[method];
  return await gasBoost(fn, parameters, options, environment);
};

export default estimateTransaction;
