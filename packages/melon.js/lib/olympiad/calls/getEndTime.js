// @flow
import getOlympiadContract from '../contracts/getOlympiadContract';

/**
 * @return Date when competition becomes inactive
 */
const getEndTime = async (environment): Promise<any> => {
  const olympiadContract = await getOlympiadContract(environment);

  const endTime = await olympiadContract.instance.endTime.call();
  return endTime;
};

export default getEndTime;
