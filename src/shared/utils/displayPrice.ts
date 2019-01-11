import * as Tm from '@melonproject/token-math';

const displayPrice = (price: Tm.price.PriceInterface, decimals?: number) => {
  const value = Tm.price.toFixed(price, decimals);
  return `${value} ${price.quote.token.symbol}`;
};

export default displayPrice;
