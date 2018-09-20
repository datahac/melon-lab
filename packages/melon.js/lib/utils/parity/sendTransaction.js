// @flow
import BigNumber from 'bignumber.js';
import gasBoost from '../ethereum/gasBoost';
import constructTransactionObject from './constructTransactionObject';
import getEnvironment from '../environment/getEnvironment';

const sendTransaction = async (
  contract,
  method,
  parameters,
  environment,
  opt = {},
) => {
  const nonce = environment.account.sign
    ? (await environment.api.eth.getTransactionCount(
        environment.account.address,
      )).toNumber()
    : undefined;

  // Prepare raw transaction
  const options = {
    from: environment.account.address,
    to: contract.address,
    gasPrice: environment.gasPrice ? environment.gasPrice : 20000000000,
    ...opt,
  };

  // HACK: If external parity signer, no need to set the nonce, Parity does it. If in-browser wallet, we need to explicitly set the nonce.
  if (nonce) {
    options.nonce = nonce;
  }

  // Estimate and adjust gas with gasBoost
  const gasKeyName = environment.account.sign ? 'gasLimit' : 'gas';

  if (
    [
      'cancelOrder',
      'offer',
      'depositStake',
      'withdrawStake',
      'collectAndUpdate',
      'callOnExchange',
    ].includes(method)
  ) {
    options[gasKeyName] = 6700000;
  } else {
    options[gasKeyName] = await gasBoost(
      contract.instance[method],
      parameters,
      options,
      environment,
    );
  }

  if (options.value) {
    options.value = `0x${options.value.toString(16)}`;
  }

  // Exit function prematurely if a confirmer is registered and it returns false
  if (environment.confirmer) {
    const confirmed = await environment.confirmer(method, [
      {
        description: 'Estimated max gas cost',
        gasLimit: options[gasKeyName],
        gasPrice: (options.gasPrice * 10 ** -9).toFixed(0),
        // inEth: new BigNumber(options[gasKeyName])
        //   .times(options.gasPrice)
        //   .div(10 ** 18),
      },
    ]);

    if (!confirmed) {
      throw new Error('Transaction cancelled');
    }

    if (confirmed.gasPrice !== undefined) {
      options.gasPrice = confirmed.gasPrice;
    }
  }
  // Construct raw transaction object
  const rawTransaction = constructTransactionObject(
    contract,
    method,
    parameters,
    options,
  );

  let transactionHash;
  if (environment.account.sign) {
    // Sign transaction object with Wallet instance
    const signedTransaction = environment.account.sign(rawTransaction);
    // Send raw signed transaction and wait for receipt
    transactionHash = await environment.api.eth.sendRawTransaction(
      signedTransaction,
    );
  } else {
    // Send raw transaction object and wait for receipt
    transactionHash = await environment.api.eth.sendTransaction(rawTransaction);
  }

  // eslint-disable-next-line no-underscore-dangle
  const rawReceipt = await contract._pollTransactionReceipt(transactionHash);

  const logs = rawReceipt.logs.filter((log) => log.address.toLowerCase() === contract.address.toLowerCase());
  const decodedLogs = contract.parseEventLogs(logs);
  const transactionReceipt = { ...rawReceipt, logs: decodedLogs };
  return transactionReceipt;
};

export default sendTransaction;
