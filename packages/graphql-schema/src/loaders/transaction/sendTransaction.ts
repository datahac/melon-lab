import {
  constructTransactionObject,
  getVersionContract,
  getConfig,
} from '@melonproject/melon.js';

const sendTransaction = async (
  environment,
  wallet,
  method,
  parameters,
  options,
) => {
  const config = await getConfig(environment);
  const contract = await getVersionContract(environment, config);

  // Construct raw transaction.
  const transaction = constructTransactionObject(
    contract,
    method,
    parameters,
    options,
  );

  const signed = await wallet.sign(transaction);
  const transactionHash = await environment.api.eth.sendRawTransaction(signed);
  // eslint-disable-next-line no-underscore-dangle
  const rawReceipt = await contract._pollTransactionReceipt(transactionHash);
  const logs = rawReceipt.logs.filter(
    log => log.address.toLowerCase() === contract.address.toLowerCase(),
  );

  const decodedLogs = contract.parseEventLogs(logs);
  const transactionReceipt = { ...rawReceipt, logs: decodedLogs };
  return transactionReceipt;
};

export default sendTransaction;
