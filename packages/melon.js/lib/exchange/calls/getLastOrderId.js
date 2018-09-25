// @flow
import BigNumber from 'bignumber.js';
import getMatchingMarketAdapterContract from '../contracts/getMatchingMarketAdapterContract';
import getConfig from '../../version/calls/getConfig';

/**
 * gets last order id
 */
const getLastOrderId = async (environment): number => {
  const config = await getConfig(environment);
  const exchangeAdapterContract = await getMatchingMarketAdapterContract(
    environment,
  );
  const lastOrderIdBigNumber: BigNumber = await exchangeAdapterContract.instance.getLastOrderId.call(
    {},
    [config.exchangeAddress],
  );
  return lastOrderIdBigNumber.toNumber();
};

export default getLastOrderId;
