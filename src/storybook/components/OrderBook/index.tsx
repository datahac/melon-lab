import React, { Fragment, StatelessComponent } from 'react';
import Checkbox from '~/blocks/Checkbox';
import Notification from '~/blocks/Notification';
import Spinner from '~/blocks/Spinner';
import OrderBookTable from '~/components/OrderBookTable';

import styles from './styles.css';

export interface OrderBookProps {
  isManager: boolean;
  setSellOrder: (volume, exchange, subset, balance) => void;
  setBuyOrder: (volume, exchange, subset, balance) => void;
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
  selectedExchanges = [],
  availableExchanges = [],
  isManager = false,
}) => {
  const setSellOrder = index => {
    // TODO:
  };

  const setBuyOrder = index => {
    // TODO:
  };

  return (
    <div className="orderbook">
      <style jsx>{styles}</style>
      {availableExchanges && (
        <div className="orderbook__exchanges">
          <div className="orderbook__exchange-label">Exchanges:</div>
          <div className="orderbook__exchange">
            <Checkbox
              onInputChange={setExchange}
              name="exchanges"
              value="ALL"
              text="All"
              defaultChecked={
                selectedExchanges.length ===
                availableExchanges.map(([key]) => key).length
              }
              disabled={loading}
            />
          </div>
          {availableExchanges.map(([key, value]) => (
            <div className="orderbook__exchange" key={key}>
              <Checkbox
                onInputChange={setExchange}
                name="exchanges"
                value={key}
                text={value}
                defaultChecked={selectedExchanges.indexOf(key) !== -1}
                disabled={loading}
              />
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="orderbook__loading">
          <Spinner icon />
        </div>
      ) : (
        <Fragment>
          {bids.length === 0 && asks.length === 0 ? (
            <Notification isWarning>
              No orders on the orderbook for this trading pair
            </Notification>
          ) : (
            <Fragment>
              <div className="orderbook__tables">
                <OrderBookTable
                  style="buy"
                  entries={asks}
                  onClickOrder={isManager && setSellOrder}
                  canTrade={isManager}
                />
                <OrderBookTable
                  style="sell"
                  entries={bids}
                  onClickOrder={isManager && setBuyOrder}
                  canTrade={isManager}
                />
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default OrderBook;
