import { QuantityInterface, toFixed } from '@melonproject/token-math/quantity';

const toFixedWithSymbol = (quantity: QuantityInterface, decimals?: number) => {
  const value = toFixed(quantity, decimals);
  return `${value} ${quantity.token.symbol}`;
};

export default toFixedWithSymbol;
