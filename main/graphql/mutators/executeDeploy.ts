import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, deployContract } from '@melonproject/protocol';

const executeDeploy = async (_, { from, signed }, { environment }) => {
  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await deployContract.send(env, {
    signedTransaction: signed.rawTransaction,
  });
  return result;
};

export { executeDeploy };
