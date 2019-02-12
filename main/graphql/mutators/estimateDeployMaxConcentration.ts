import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  deployContract,
  Contracts,
} from '@melonproject/protocol';

const estimateDeployMaxConcentration = async (
  _,
  { from, percent },
  { environment },
) => {
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await deployContract.prepare(env, Contracts.MaxConcentration, [
    `${Tm.divide(Tm.appendDecimals(Tm.createToken('ETH'), percent), 100)}`,
  ]);
  return result.unsignedTransaction;
};

export { estimateDeployMaxConcentration };
