import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, completeSetup } from '@melonproject/protocol';

const executeFundSetupComplete = async (
  _,
  { from, signedOrNot },
  { loaders },
) => {
  const environment = await loaders.environment();
  const transaction = signedOrNot.rawTransaction
    ? signedOrNot.rawTransaction
    : signedOrNot;

  const version = environment.deployment.melonContracts.version;
  const env = withDifferentAccount(environment, new Tm.Address(from));

  return completeSetup.send(env, version, transaction);
};

export { executeFundSetupComplete };
