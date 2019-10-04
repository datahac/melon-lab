import * as Tm from '@melonproject/token-math';
import {
  createAccounting,
  createFeeManager,
  createParticipation,
  createPolicyManager,
  createShares,
  createTrading,
  createVault,
  withDifferentAccount,
} from '@melonproject/protocol';

const estimateFundSetupStep = async (_, { step, from }, { loaders }) => {
  const environment = await loaders.environment();
  const version = environment.deployment.melonContracts.version;
  const fn = {
    CREATE_ACCOUNTING: createAccounting,
    CREATE_FEE_MANAGER: createFeeManager,
    CREATE_PARTICIPATION: createParticipation,
    CREATE_POLICY_MANAGER: createPolicyManager,
    CREATE_SHARES: createShares,
    CREATE_TRADING: createTrading,
    CREATE_VAULT: createVault,
  }[step];

  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await fn.prepare(env, version);

  return result && { ...result.rawTransaction, amguInEth: result.amguInEth };
};

export { estimateFundSetupStep };
