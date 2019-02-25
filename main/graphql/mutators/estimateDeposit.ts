import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  deposit,
  getTokenBySymbol,
} from '@melonproject/protocol';

const estimateDeposit = async (_, { from, quantity }, { loaders }) => {
  const environment = await loaders.environment();
  const wethToken = await getTokenBySymbol(environment, 'WETH');
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await deposit.prepare(
    env,
    wethToken.address as Tm.Address,
    undefined,
    {
      value: quantity,
    },
  );
  return result && result.rawTransaction;
};

export { estimateDeposit };
