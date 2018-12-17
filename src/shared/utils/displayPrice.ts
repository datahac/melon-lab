import { PriceInterface, toFixed } from '@melonproject/token-math/price';

const displayPrice = (price: PriceInterface, decimals?: number) => {
  const value = toFixed(price, decimals);
  return `${value} ${price.quote.token.symbol}`;
};

export default displayPrice;
