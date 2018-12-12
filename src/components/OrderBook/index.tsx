import { withHandlers } from 'recompose';
import OrderBook from '~/components/OrderBook';
import { min, toBigNumber } from '~/utils/functionalBigNumber';

const averagePrice = (type: 'buy' | 'sell', orders) => {
  const cumulatedVolumes = orders.reduce(
    (accumulator, current) => ({
      buy: accumulator.buy.add(current.buy.quantity),
      sell: accumulator.sell.add(current.sell.quantity),
    }),
    {
      buy: toBigNumber(0),
      sell: toBigNumber(0),
    },
  );

  if (type === 'buy') {
    return cumulatedVolumes.sell.div(cumulatedVolumes.buy);
  } else if (type === 'sell') {
    return cumulatedVolumes.buy.div(cumulatedVolumes.sell);
  }

  return null;
};

const withSetOrderHandler = withHandlers({
  setBuyOrder: props => (volume, exchange, subset, symbol) => {
    const balance = props.holdings.find(h => h.symbol === symbol).balance;
    const price = averagePrice('sell', subset);
    const total = min(toBigNumber(balance), price.times(volume));
    const amount = total.div(price);

    props.setOrder({
      strategy: 'Market',
      type: 'buy',
      exchange,
      quantity: amount.toString(),
      total: total.toString(),
      price: price.toString(),
    });
  },
  setSellOrder: props => (volume, exchange, subset, symbol) => {
    const balance = props.holdings.find(h => h.symbol === symbol).balance;
    const price = averagePrice('buy', subset);
    const amount = min(toBigNumber(balance), volume);
    const total = price.times(amount);

    props.setOrder({
      strategy: 'Market',
      type: 'sell',
      exchange,
      quantity: amount.toString(),
      total: total.toString(),
      price: price.toString(),
    });
  },
  setExchange: props => e => {
    const { exchanges, availableExchanges } = props;
    const value = e.target.value;
    const selectedExchanges = exchanges;

    if (value === 'ALL') {
      if (
        exchanges.length ===
        availableExchanges.map(exchange => exchange.value).length
      ) {
        return props.setExchanges([]);
      } else {
        return props.setExchanges(
          availableExchanges.map(exchange => exchange.value),
        );
      }
    } else {
      if (!exchanges.includes(value)) {
        selectedExchanges.push(value);
      } else {
        const index = selectedExchanges.indexOf(value);
        selectedExchanges.splice(index, 1);
      }
    }
    return props.setExchanges(selectedExchanges);
  },
});

export default withSetOrderHandler(OrderBook);
