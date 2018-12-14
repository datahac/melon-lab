import classNames from 'classnames';
import React from 'react';
import VolumeBar from '~/components/VolumeBar';
import { subtract, multiply, divide } from '@melonproject/token-math/bigInteger';
import styles from './styles.css';

const OrderBookTable = ({
  style,
  entries,
  totalVolume,
  decimals = 0,
  onClickOrder,
  canTrade,
}) => {
  const orderBookTableClassNames = classNames('orderbook-table', {
    [`orderbook-table--${style}`]: style,
  });

  const calculateBar = (prevEntry, entry, totalVolume) => {
    const getPercentage = (cumulativeVolume, totalVolume) => {
      return multiply(divide(cumulativeVolume, totalVolume), 100);
    };

    const percentageDiff =
      prevEntry &&
      getPercentage(
        subtract(entry.volume, prevEntry.volume),
        totalVolume,
      );

    const prevEntryPercentage =
      prevEntry && getPercentage(prevEntry.volume, totalVolume);

    const entryPercentage = entry && getPercentage(entry.volume, totalVolume);

    return {
      percentageDiff,
      prevEntryPercentage,
      entryPercentage,
    };
  };

  return (
    <div className={orderBookTableClassNames}>
      <style jsx>{styles}</style>
      <div className="orderbook-table__head">
        <div className="orderbook-table__head-row">
          <div className="orderbook-table__head-cell">Ask</div>
          <div className="orderbook-table__head-cell">Vol.</div>
          <div className="orderbook-table__head-cell">Cum. Vol.</div>
        </div>
      </div>
      <div className="orderbook-table__body">
        {entries.map((entry, index) => {
          const volume = Number.parseFloat(entry.volume).toFixed(decimals);
          const howMuch = Number.parseFloat(entry.order.sell.howMuch).toFixed(
            decimals,
          );
          const price = Number.parseFloat(entry.order.price).toFixed(decimals);

          const calculatedBar = calculateBar(
            entries[index - 1],
            entry,
            totalVolume,
          );

          let leftSpaceBorder;
          if (style === 'sell') {
            leftSpaceBorder = `calc(${calculatedBar.entryPercentage}% - ${
              calculatedBar.percentageDiff
            }% ${calculatedBar.prevEntryPercentage > 0.5 && '- 1px'})`;
          } else {
            leftSpaceBorder = `calc(100% - ${
              calculatedBar.entryPercentage
            }% ${calculatedBar.prevEntryPercentage > 0.5 && '+ 1px'})`;
          }

          return (
            <div
              className="orderbook-table__body-row"
              key={`${entry.order.id}-${index}`}
              onClick={() => onClickOrder && onClickOrder(index)}
              style={{
                cursor: canTrade ? 'pointer' : 'auto',
              }}
            >
              <div className="orderbook-table__body-cell">{price}</div>
              <div className="orderbook-table__body-cell">{howMuch}</div>
              <div className="orderbook-table__body-cell">{volume}</div>

              <VolumeBar
                style={style}
                widthBar={`${
                  calculatedBar.entryPercentage > 100
                    ? 100
                    : calculatedBar.entryPercentage
                }%`}
                widthBorder={`${calculatedBar.percentageDiff}%`}
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
