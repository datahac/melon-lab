import * as Tm from '@melonproject/token-math';
import {
  deposit,
  withDifferentAccount,
  getTokenBySymbol,
} from '@melonproject/protocol';

const executeDeposit = async (_, { from, signedOrNot }, { loaders }) => {
  const environment = await loaders.environment();
  const transaction = signedOrNot.rawTransaction
    ? signedOrNot.rawTransaction
    : signedOrNot;

  const wethToken = await getTokenBySymbol(environment, 'WETH');
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await deposit.send(
    env,
    wethToken.address as Tm.Address,
    transaction,
  );

  return !!result;
};

export { executeDeposit };
