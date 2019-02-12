import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  getTokenBySymbol,
  deployContract,
  Contracts,
} from '@melonproject/protocol';

const estimateDeployAssetWhitelist = async (
  _,
  { from, symbols },
  { environment },
) => {
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const addresses = symbols.map(
    symbol => getTokenBySymbol(env, symbol).address,
  );

  const result = await deployContract.prepare(env, Contracts.AssetWhitelist, [
    addresses,
  ]);

  return result.unsignedTransaction;
};

export { estimateDeployAssetWhitelist };
