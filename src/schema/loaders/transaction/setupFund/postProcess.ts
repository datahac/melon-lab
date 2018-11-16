import { findEventInLog } from '@melonproject/melon.js';

const postProcess = async receipt => {
  const fundAddedMessage = findEventInLog(
    'FundUpdated',
    receipt,
    'Error during fund creation',
  );
  const logArgs = fundAddedMessage.params;
  const fundAddress = logArgs.ofFund.value;
  return fundAddress;
};

export default postProcess;
