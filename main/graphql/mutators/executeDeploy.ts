import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, deployContract } from '@melonproject/protocol';

const executeDeploy = async (_, { from, signedOrNot }, { environment }) => {
  const args = signedOrNot.rawTransaction
    ? { signedTransaction: signedOrNot.rawTransaction }
    : { unsignedTransaction: signedOrNot };

  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await deployContract.send(env, args);
  return result;
};

export { executeDeploy };
