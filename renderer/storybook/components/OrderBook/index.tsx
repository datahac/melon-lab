import React, { Fragment, StatelessComponent } from 'react';
import Checkbox from '~/blocks/Checkbox';
import Notification from '~/blocks/Notification';
import Spinner from '~/blocks/Spinner';
import OrderBookTable from '~/components/OrderBookTable';

import styles from './styles.css';

export interface SetOrderProps {
  id;
  price;
  quantity;
  total;
  type;
}

export interface OrderBookProps {
  isManager: boolean;
  setOrder: (args: SetOrderProps) => void;
  setExchange: (e) => void;
  selectedExchanges: any;
  availableExchanges: any;
  loading: boolean;
  bids: any;
  asks: any;
}

export const OrderBook: StatelessComponent<OrderBookProps> = ({
  loading,
  asks = [],
  bids = [],
  setExchange,
  selectedExchanges = ['OASIS_DEX'],
  availableExchanges = [],
  isManager = false,
  setOrder = () => {},
}) => {
  const setSellOrder = id => {
    const order = bids.find(b => b.id === id);
    setOrder(order);
  };

  const setBuyOrder = id => {
    const order = asks.find(b => b.id === id);
    setOrder(order);
  };

  return (
    <div className="orderbook">
      <style jsx>{styles}</style>
      {availableExchanges && (
        <div className="orderbook__exchanges">
          <div className="orderbook__exchange-label">Exchanges:</div>
          <div className="orderbook__exchange">
            <Checkbox
              handleOnChange={setExchange}
              name="exchanges"
              value="ALL"
              text="All"
              key={selectedExchanges}
              defaultChecked={
                selectedExchanges.length === availableExchanges.length
              }
            />
          </div>
          {availableExchanges.map(([key, value]) => (
            <div className="orderbook__exchange" key={key}>
              <Checkbox
                handleOnChange={setExchange}
                name="exchanges"
                value={key}
                text={value}
                key={selectedExchanges}
                defaultChecked={selectedExchanges.indexOf(key) !== -1}
              />
            </div>
          ))}
        </div>
      )}

      {loading && bids.length === 0 && asks.length === 0 && (
        <div className="orderbook__loading">
          <Spinner icon={true} />
        </div>
      )}

      {!loading && bids.length === 0 && asks.length === 0 && (
        <Notification isWarning={true}>
          No orders on the orderbook for this trading pair
        </Notification>
      )}

      {(bids.length !== 0 || asks.length !== 0) && (
        <Fragment>
          <div className="orderbook__tables">
            <OrderBookTable
              style="buy"
              entries={bids}
              onClickOrder={isManager && setSellOrder}
              canTrade={isManager}
            />
            <OrderBookTable
              style="sell"
              entries={asks}
              onClickOrder={isManager && setBuyOrder}
              canTrade={isManager}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default OrderBook;
