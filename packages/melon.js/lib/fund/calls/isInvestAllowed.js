// @flow
import getFundContract from '../contracts/getFundContract';
import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
/**
 * Fund investment authorizations
 */

/**
 * Returns a boolean as to wether or not investment in a specific asset investAssetSymbol is allowed or not.
 */
const isInvestAllowed = async (
  environment,
  { fundAddress, investAssetSymbol },
): Promise<Boolean> => {
  const config = await getConfig(environment);
  const investAssetAddress = getAddress(config, investAssetSymbol);
  const fundContract = await getFundContract(environment, fundAddress);
  const subscriptionAllowed = await fundContract.instance.isInvestAllowed.call(
    {},
    [investAssetAddress],
  );

  return subscriptionAllowed;
};

export default isInvestAllowed;
