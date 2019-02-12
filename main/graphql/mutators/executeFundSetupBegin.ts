import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, beginSetup } from '@melonproject/protocol';

const executeFundSetupBegin = (_, { from, signedOrNot }, { environment }) => {
  const transaction = signedOrNot.rawTransaction
    ? signedOrNot.rawTransaction
    : signedOrNot;

  const version = environment.deployment.melonContracts.version;
  const env = withDifferentAccount(environment, new Tm.Address(from));

  return beginSetup.send(env, version, transaction);
};

export { executeFundSetupBegin };
