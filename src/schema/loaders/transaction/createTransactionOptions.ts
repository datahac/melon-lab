import { getConfig, getVersionContract } from '@melonproject/melon.js';

const createTransactionOptions = async (environment, wallet) => {
  const config = await getConfig(environment);
  const contract = await getVersionContract(environment, config);
  const nonce = await environment.api.eth.getTransactionCount(wallet.address);
  const options = {
    // TODO: Remove the parseInt() call in the new melon.js.
    nonce: parseInt(nonce.toString(), 10),
    from: wallet.address,
    to: contract.address,
  };

  return options;
};

export default createTransactionOptions;
