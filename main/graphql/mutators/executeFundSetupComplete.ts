import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, completeSetup } from '@melonproject/protocol';

const executeFundSetupComplete = async (
  _,
  { from, signed },
  { environment },
) => {
  const version = environment.deployment.melonContracts.version;
  const transaction = signed.rawTransaction;
  const env = withDifferentAccount(environment, new Tm.Address(from));

  return completeSetup.send(env, version, transaction);
};

export { executeFundSetupComplete };
