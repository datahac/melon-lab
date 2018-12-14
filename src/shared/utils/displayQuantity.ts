import { QuantityInterface, toFixed } from '@melonproject/token-math/quantity';

const displayQuantity = (quantity: QuantityInterface, decimals?: number) => {
  // TODO: Remove this safety hatch.
  if (!quantity || !quantity.quantity) {
    return quantity;
  }

  const value = toFixed(quantity, decimals);
  return `${value} ${quantity.token.symbol}`;
};

export default displayQuantity;
