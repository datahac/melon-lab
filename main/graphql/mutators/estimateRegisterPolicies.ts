import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  FunctionSignatures,
  register,
} from '@melonproject/protocol';

enum PolicyTypes {
  TRADING = 'TRADING',
  INVEST = 'INVEST',
  BOTH = 'BOTH',
}

const estimateRegisterPolicies = async (_, { from, policies }, { loaders }) => {
  const environment = await loaders.environment();
  const env = withDifferentAccount(environment, new Tm.Address(from));
  const fund = await loaders.fundAddressFromManager.load(from);
  const { policyManagerAddress } = await loaders.fundRoutes.load(fund);

  const registrations = policies.reduce((carry, current) => {
    if (current.type === PolicyTypes.TRADING) {
      return [
        {
          method: FunctionSignatures.takeOrder,
          policy: current.address,
        },
        {
          method: FunctionSignatures.makeOrder,
          policy: current.address,
        },
        {
          method: FunctionSignatures.cancelOrder,
          policy: current.address,
        },
        ...carry,
      ];
    }

    if (current.type === PolicyTypes.BOTH) {
      return [
        {
          method: FunctionSignatures.takeOrder,
          policy: current.address,
        },
        {
          method: FunctionSignatures.makeOrder,
          policy: current.address,
        },
        {
          method: FunctionSignatures.cancelOrder,
          policy: current.address,
        },
        {
          method: FunctionSignatures.requestInvestment,
          policy: current.address,
        },
        ...carry,
      ];
    }

    if (current.type === PolicyTypes.INVEST) {
      return [
        {
          method: FunctionSignatures.requestInvestment,
          policy: current.address,
        },
        ...carry,
      ];
    }

    return carry;
  }, []);

  const result = await register.prepare(
    env,
    policyManagerAddress,
    registrations,
  );

  return result.rawTransaction;
};

export { estimateRegisterPolicies };
