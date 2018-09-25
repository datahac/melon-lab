// @flow
import getStakingPriceFeedContract from '../../contracts/getStakingPriceFeedContract';
import sendTransaction from '../../../utils/parity/sendTransaction';

/**
 * Update prices with `newPrices` array for the `assets` array.
 * This function can be called by the owner of the pricefeed.
 */
const withdrawStake = async (environment, { address }): Promise<any> => {
  const stakingPriceFeedContract = await getStakingPriceFeedContract(
    environment,
    address,
  );

  const receipt = await sendTransaction(
    stakingPriceFeedContract,
    'withdrawStake',
    [],
    environment,
  );

  return receipt;
};

export default withdrawStake;
