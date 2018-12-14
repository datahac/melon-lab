import React, { Fragment, StatelessComponent } from 'react';
import Checkbox from '~/blocks/Checkbox';
import Notification from '~/blocks/Notification';
import Spinner from '~/blocks/Spinner';
import OrderBookTable from '~/components/OrderBookTable';

import styles from './styles.css';

export interface OrderBookProps {
  baseAsset?: string;
  decimals?: number;
  isManager: boolean;
  loading: boolean;
  setSellOrder: (volume, exchange, subset, balance) => void;
  setBuyOrder: (volume, exchange, subset, balance) => void;
  orderbook?: any;
  quoteAsset?: string;
  setExchange: (e) => void;
  exchanges: any;
  availableExchanges: any;
  totalBuyVolume;
  totalSellVolume;
  sellEntries;
  buyEntries;
}

export const OrderBook: StatelessComponent<OrderBookProps> = ({
  baseAsset,
  decimals = 4,
  isManager = false,
  loading,
  setSellOrder: setSellOrderFinal,
  setBuyOrder: setBuyOrderFinal,
  quoteAsset,
  totalBuyVolume,
  totalSellVolume,
  sellEntries = [],
  buyEntries = [],
  setExchange,
  exchanges = [],
  availableExchanges = [],
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
                exchanges.length ===
                availableExchanges.map(exchange => exchange.value).length
              }
              disabled={loading}
            />
          </div>
          {availableExchanges.map(exchange => (
            <div className="orderbook__exchange" key={exchange.value}>
              <Checkbox
                onInputChange={setExchange}
                name="exchanges"
                value={exchange.value}
                text={exchange.text}
                defaultChecked={exchanges.indexOf(exchange.value) !== -1}
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
          {sellEntries.length === 0 && buyEntries.length === 0 ? (
            <Notification isWarning>
              No orders on the orderbook for this trading pair
            </Notification>
          ) : (
            <Fragment>
              <div className="orderbook__tables">
                <OrderBookTable
                  style="buy"
                  entries={buyEntries}
                  totalVolume={totalBuyVolume}
                  decimals={decimals}
                  onClickOrder={isManager && setSellOrder}
                  canTrade={isManager}
                />
                <OrderBookTable
                  style="sell"
                  entries={sellEntries}
                  totalVolume={totalSellVolume}
                  decimals={decimals}
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
