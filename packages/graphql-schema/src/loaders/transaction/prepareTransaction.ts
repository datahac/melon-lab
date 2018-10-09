import { constructTransactionObject } from '@melonproject/melon.js';

const prepareSendTransaction = async (
  account,
  contract,
  method,
  parameters,
  environment,
) => {
  const nonce = await environment.api.eth.getTransactionCount(account);

  // Prepare raw transaction.
  const options = {
    nonce,
    from: environment.account.address,
    to: contract.address,
    gasPrice: environment.gasPrice ? environment.gasPrice : 20000000000,
  };

  // Construct raw transaction.
  const rawTransaction = constructTransactionObject(
    contract,
    method,
    parameters,
    options,
  );

  return rawTransaction;
};

export default prepareSendTransaction;
