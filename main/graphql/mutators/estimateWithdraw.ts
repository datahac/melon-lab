import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  withdraw,
  getTokenBySymbol,
} from '@melonproject/protocol';

const estimateWithdraw = async (_, { from, quantity }, { loaders }) => {
  const environment = await loaders.environment();
  const wethToken = await getTokenBySymbol(environment, 'WETH');
  const env = withDifferentAccount(environment, new Tm.Address(from));
  const howMuch = Tm.createQuantity(wethToken, quantity);

  const result = await withdraw.prepare(env, wethToken.address, { howMuch });
  return result && result.rawTransaction;
};

export { estimateWithdraw };
