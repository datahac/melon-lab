// @flow
import getConfig from '../../version/calls/getConfig';
import getOlympiadContract from '../contracts/getOlympiadContract';
import getRegistrantFund from '../calls/getRegistrantFund';
import getVersionContract from '../../version/contracts/getVersionContract';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import sendTransaction from '../../utils/parity/sendTransaction';
import toReadable from '../../assets/utils/toReadable';
import ensure from '../../utils/generic/ensure';

/**
 * Calling this function will register the sender on the competition contract and will allocate to his fund an amount of MLN in proportion of his buyInValue in ETH.
 */
const claimReward = async (environment): Promise<any> => {
  const registrantFund = await getRegistrantFund(environment);

  ensure(
    registrantFund.toLowerCase() !==
      '0x0000000000000000000000000000000000000000',
    'Sender not registered.',
  );

  const olympiadContract = await getOlympiadContract(environment);

  const receipt = await sendTransaction(
    olympiadContract,
    'claimReward',
    [],
    environment,
  );
  const claimedLog = findEventInLog('ClaimReward', receipt);

  return {
    registrant: claimedLog.params.registrant.value,
    fundAddress: claimedLog.params.fund.value,
    shares: claimedLog.params.shares.value.toNumber(),
  };
};

export default claimReward;
