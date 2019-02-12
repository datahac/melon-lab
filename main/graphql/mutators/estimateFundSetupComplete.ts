import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, completeSetup } from '@melonproject/protocol';

const estimateFundSetupComplete = async (_, { from }, { environment }) => {
  const version = environment.deployment.melonContracts.version;
  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await completeSetup.prepare(env, version);

  return result && { ...result.rawTransaction, amguInEth: result.amguInEth };
};

export { estimateFundSetupComplete };
