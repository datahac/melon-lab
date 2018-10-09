import { getVersionContract } from '@melonproject/melon.js';

const sendTransaction = async (
  environment,
  config,
  transaction,
) => {
  const contract = await getVersionContract(environment, config);
  const transactionHash = await environment.api.eth.sendRawTransaction(transaction);
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
