import React from 'react';

import styles from './styles.css';

const Fund = ({
  FactSheet,
  FactSheetProps,
  Holdings,
  HoldingsProps,
  OrderForm,
  OrderFormProps,
  OrderBook,
  OrderBookProps,
  OpenOrders,
  RecentTrades,
  RecentTradesProps,
}) => {
  return (
    <div className="trade">
      <style jsx>{styles}</style>
      <div className="trade__info">
        <div className="trade__info-item">
          <FactSheet {...FactSheetProps} />
        </div>
      </div>
      <div className="trade__holdings">
        <Holdings {...HoldingsProps} />
      </div>
      <div className="trade__order">
        <div className="trade__order-book" id="orderbook">
          <OrderBook {...OrderBookProps} />
        </div>
        <div className="trade__order-form" id="trade">
          <OrderForm {...OrderFormProps} />
        </div>
      </div>
      <div className="trade__open-orders">
        <OpenOrders />
      </div>
      <div className="trade__recent-trades">
        <RecentTrades {...RecentTradesProps} />
      </div>
    </div>
  );
};

export default Fund;
