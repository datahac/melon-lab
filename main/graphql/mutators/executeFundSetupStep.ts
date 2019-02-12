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

const executeFundSetupStep = async (
  _,
  { step, from, signed },
  { environment },
) => {
  const version = environment.deployment.melonContracts.version;
  const transaction = signed.rawTransaction;
  const fn = {
    // TODO: Change
    CREATE_ACCOUNTING: createAccounting,
    CREATE_FEE_MANAGER: createFeeManager,
    CREATE_PARTICIPATION: createParticipation,
    CREATE_POLICY_MANAGER: createPolicyManager,
    CREATE_SHARES: createShares,
    CREATE_TRADING: createTrading,
    CREATE_VAULT: createVault,
  }[step];

  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await fn.send(env, version, transaction);

  return !!result;
};

export { executeFundSetupStep };
