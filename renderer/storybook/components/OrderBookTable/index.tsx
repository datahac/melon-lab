import React from 'react';
import * as Tm from '@melonproject/token-math';
import classNames from 'classnames';
import VolumeBar from '~/components/VolumeBar';
import styles from './styles.css';

const OrderBookTable = ({ style, entries, onClickOrder, canTrade }) => {
  const total =
    entries && entries.length
      ? parseInt(entries[entries.length - 1].cummulative.quantity, 10)
      : 0;
  const orderBookTableClassNames = classNames('orderbook-table', {
    [`orderbook-table--${style}`]: style,
  });

  return (
    <div className={orderBookTableClassNames}>
      <style jsx>{styles}</style>
      <div className="orderbook-table__head">
        <div className="orderbook-table__head-row">
          <div className="orderbook-table__head-cell">
            {style === 'sell' ? 'Ask' : 'Bid'}
          </div>
          <div className="orderbook-table__head-cell">Vol.</div>
          <div className="orderbook-table__head-cell">Cum. Vol.</div>
        </div>
      </div>
      <div className="orderbook-table__body">
        {entries.map((order, index) => {
          const cur = parseInt(order.cummulative.quantity, 10);
          const current = Math.max(0, Math.min(100, (cur / total) * 100));

          return (
            <div
              className="orderbook-table__body-row"
              key={`${order.id}-${index}`}
              onClick={() => onClickOrder && onClickOrder(order.id)}
              style={{
                cursor: canTrade ? 'pointer' : 'auto',
              }}
            >
              <div className="orderbook-table__body-cell">
                {Tm.toFixed(order.trade, 6)}
              </div>
              <div className="orderbook-table__body-cell">
                {Tm.toFixed(order.trade.base, 6)}
              </div>
              <div className="orderbook-table__body-cell">
                {Tm.toFixed(order.cummulative, 6)}
              </div>

              <VolumeBar style={style} widthBar={`${current}%`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderBookTable;
