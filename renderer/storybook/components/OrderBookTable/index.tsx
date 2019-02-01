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
          const prev = entries[index - 1]
            ? parseInt(entries[index - 1].cummulative.quantity, 10)
            : 0;
          const cur = parseInt(order.cummulative.quantity, 10);
          const difference = Math.max(
            0,
            Math.min(((prev - cur) / total) * 100),
          );
          const previous = Math.max(0, Math.min((prev / total) * 100));
          const current = Math.max(0, Math.min(100, (cur / total) * 100));

          const leftSpaceBorder =
            style === 'sell'
              ? `calc(${current}% - ${difference}% ${previous > 0.5 &&
                  '- 1px'})`
              : `calc(100% - ${current}% ${previous > 0.5 && '+ 1px'})`;

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
                {Tm.toFixed(order.trade, 4)}
              </div>
              <div className="orderbook-table__body-cell">
                {Tm.toFixed(order.trade.base, 4)}
              </div>
              <div className="orderbook-table__body-cell">
                {Tm.toFixed(order.cummulative, 4)}
              </div>

              <VolumeBar
                style={style}
                widthBar={`${current}%`}
                widthBorder={`${difference}%`}
                leftSpaceBorder={leftSpaceBorder}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderBookTable;
