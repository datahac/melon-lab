import * as Tm from '@melonproject/token-math';

const displayPrice = (price: Tm.PriceInterface, decimals?: number) => {
  const value = Tm.toFixed(price, decimals);
  return `${value} ${price.quote.token.symbol}`;
};

export default displayPrice;
