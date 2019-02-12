import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  FunctionSignatures,
  register,
} from '@melonproject/protocol';

const estimateRegisterPolicies = async (
  _,
  { from, policies },
  { environment, loaders },
) => {
  const env = withDifferentAccount(environment, new Tm.Address(from));
  const fund = await loaders.fundAddressFromManager.load(from);
  const { policyManagerAddress } = await loaders.fundRoutes.load(fund);

  const registrations = policies.reduce((carry, current) => {
    if (current.type === 'TRADE') {
      return [
        {
          method: FunctionSignatures.takeOrder,
          policy: current.address,
        },
        {
          method: FunctionSignatures.makeOrder,
          policy: current.address,
        },
        ...carry,
      ];
    }
    return [
      {
        method: FunctionSignatures.executeRequestFor,
        policy: current.address,
      },
    ];
  }, []);

  const result = await register.prepare(
    env,
    policyManagerAddress,
    registrations,
  );

  return result.rawTransaction;
};

export { estimateRegisterPolicies };
