// @flow
import toReadable from '../../assets/utils/toReadable';
import getSymbol from '../../assets/utils/getSymbol';
import getMatchingMarketAdapterContract from '../contracts/getMatchingMarketAdapterContract';
import getMatchingMarketContract from '../contracts/getMatchingMarketContract';

import getConfig from '../../version/calls/getConfig';

import type { Environment } from '../../utils/environment/Environment';
import type { Order, RawOrder } from '../schemas/Order';

const isKnownAssetAddress = (config, address) =>
  config.assets.find(
    asset => asset.address.toLowerCase() === address.toLowerCase(),
  );

/**
 * Gets the normalised order from the exchange specified by `id`.
 * Only if the order is active, it has the fields `buy` and `sell`
 */
const getOrder = async (environment: Environment, { id }): Promise<Order> => {
  const config = await getConfig(environment);
  const matchingMarketAdapterContract = await getMatchingMarketAdapterContract(
    environment,
  );
  const matchingMarketContract = await getMatchingMarketContract(environment);
  const isActive: boolean = await matchingMarketContract.instance.isActive.call(
    {},
    [id],
  );

  const owner: string = await matchingMarketContract.instance.getOwner.call(
    {},
    [id],
  );
  const order: RawOrder = await matchingMarketAdapterContract.instance.getOrder.call(
    {},
    [config.matchingMarketAddress, id],
  );

  const [sellWhichToken, buyWhichToken, sellHowMuch, buyHowMuch] = order;
  const enhancedOrder = {
    id,
    owner,
    isActive:
      isActive &&
      sellWhichToken !== '0x0000000000000000000000000000000000000000' &&
      buyWhichToken !== '0x0000000000000000000000000000000000000000' &&
      !!isKnownAssetAddress(config, sellWhichToken) &&
      !!isKnownAssetAddress(config, buyWhichToken),
  };

  if (enhancedOrder.isActive) {
    // inactive orders have token set to 0x0000... so only enhance active orders
    const sellSymbol = getSymbol(config, sellWhichToken);
    const buySymbol = getSymbol(config, buyWhichToken);
    enhancedOrder.sell = {
      symbol: sellSymbol,
      howMuch: toReadable(config, sellHowMuch, sellSymbol),
    };

    enhancedOrder.buy = {
      symbol: buySymbol,
      howMuch: toReadable(config, buyHowMuch, buySymbol),
    };
  }

  return enhancedOrder;
};

export default getOrder;
