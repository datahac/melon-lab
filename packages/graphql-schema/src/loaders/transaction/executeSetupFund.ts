import { findEventInLog } from '@melonproject/melon.js';
import sendTransaction from './sendTransaction';

const executeSetupFund = async (environment, config, transaction) => {
  const receipt = await sendTransaction(environment, config, transaction);
  const fundAddedMessage = findEventInLog(
    'FundUpdated',
    receipt,
    'Error during fund creation',
  );

  const logArgs = fundAddedMessage.params;
  const fundAddress = logArgs.ofFund.value;

  return fundAddress;
}

export default executeSetupFund;
