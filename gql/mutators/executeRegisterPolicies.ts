import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, register } from '@melonproject/protocol';

const executeRegisterPolicies = async (_, { from, signedOrNot }, { loaders }) => {
  const environment = await loaders.environment();
  const transaction = signedOrNot.rawTransaction ? signedOrNot.rawTransaction : signedOrNot;

  const env = withDifferentAccount(environment, new Tm.Address(from));
  const fund = await loaders.fundAddressFromManager.load(from);
  const { policyManagerAddress } = await loaders.fundRoutes.load(fund);

  const result = await register.send(env, policyManagerAddress, transaction);

  return result;
};

export { executeRegisterPolicies };
