import React from 'react';
import OrderBook from '~/components/OrderBook';

export default ({ asks, bids, loading, isManager, setOrder, allExchanges, updateExchanges, selectedExchanges }) => {
  return (
    <OrderBook
      loading={loading}
      bids={bids}
      asks={asks}
      availableExchanges={allExchanges}
      setExchange={updateExchanges}
      selectedExchanges={selectedExchanges}
      isManager={isManager}
      setOrder={setOrder}
    />
  );
};
