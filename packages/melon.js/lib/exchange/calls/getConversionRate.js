// @flow
import BigNumber from 'bignumber.js';
import getKyberProxyContract from '../contracts/getKyberProxyContract';
import getConfig from '../../version/calls/getConfig';
import getAddress from '../../assets/utils/getAddress';
import toProcessable from '../../assets/utils/toProcessable';

/**
 * gets last order id
 */
const getConversionRate = async (
  environment,
  { srcTokenSymbol, destTokenSymbol, srcAmount },
): BigNumber => {
  const config = await getConfig(environment);
  const srcToken = getAddress(config, srcTokenSymbol);
  const destToken = getAddress(config, destTokenSymbol);
  const kyberProxyContract = await getKyberProxyContract(environment);
  const conversionRate: [
    BigNumber,
    BigNumber,
  ] = await kyberProxyContract.instance.getExpectedRate.call({}, [
    srcToken,
    destToken,
    toProcessable(config, srcAmount, srcTokenSymbol),
  ]);
  return conversionRate;
};

export default getConversionRate;
