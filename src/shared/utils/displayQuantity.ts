import * as Tm from '@melonproject/token-math';

const displayQuantity = (
  quantity: Tm.quantity.QuantityInterface,
  decimals?: number,
) => {
  // TODO: Remove this safety hatch.
  if (!quantity || !quantity.quantity) {
    return quantity;
  }

  const value = Tm.quantity.toFixed(quantity, decimals);
  return `${value} ${quantity.token.symbol}`;
};

export default displayQuantity;
