import BigNumber from 'bignumber.js';
import React, { Fragment, StatelessComponent } from 'react';
import Checkbox from '~/blocks/Checkbox';
import Notification from '~/blocks/Notification';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface OrderbookProps {
  baseToken?: string;
  decimals?: number;
  isReadyToTrade: boolean;
  loading: boolean;
  onClick: (index) => void;
  orderbook?: any;
  quoteToken?: string;
  setExchange: (e) => void;
  exchanges: any;
  availableExchanges: any;
}

const Bar = ({ widthBar, widthBorder, leftSpaceBorder }) => {
  return (
    <Fragment>
      <span
        className="orderbook__bar-item"
        style={{
          width: widthBar,
        }}
      />
      <span
        className="orderbook__bar-border"
        style={{
          left: leftSpaceBorder,
          width: widthBorder,
        }}
      />
    </Fragment>
  );
};

export const Orderbook: StatelessComponent<OrderbookProps> = ({
  baseToken,
  decimals = 4,
  isReadyToTrade = true,
  loading,
  onClick,
  orderbook,
  quoteToken,
  setExchange,
  exchanges,
  availableExchanges,
}) => {
  const onChangeExchange = e => {
    availableExchanges = availableExchanges.map(exchange => exchange.value);
    let newExchange = exchanges;
    const value = e.target.value;
    if (value === 'ALL') {
      if (exchanges.length === availableExchanges.length) {
        newExchange = [];
      } else {
        newExchange = availableExchanges;
      }
    } else {
      if (!exchanges.includes(value)) {
        newExchange.push(value);
      } else {
        const index = newExchange.indexOf(value);
        newExchange.splice(index, 1);
      }
    }
    return setExchange(newExchange);
  };

  const calculateBar = (prevEntry, entry) => {
    const getPercentage = (cumulativeVolume, totalVolume) => {
      return new BigNumber(cumulativeVolume).div(totalVolume).times(100);
    };

    const percentageDiff =
      prevEntry &&
      getPercentage(
        new BigNumber(entry.volume).minus(prevEntry.volume),
        orderbook.totalBuyVolume,
      );

    const prevEntryPercentage =
      prevEntry && getPercentage(prevEntry.volume, orderbook.totalBuyVolume);

    const entryPercentage =
      entry && getPercentage(entry.volume, orderbook.totalBuyVolume);

    return {
      percentageDiff,
      prevEntryPercentage,
      entryPercentage,
    };
  };

  return (
    <div className="orderbook">
      <style jsx>{styles}</style>
      <h3>
        Orderbook for {baseToken}/{quoteToken}
      </h3>

      {availableExchanges && (
        <div className="orderbook__exchanges">
          <div className="orderbook__exchange-label">Exchanges:</div>
          <div className="orderbook__exchange">
            <Checkbox
              onInputChange={onChangeExchange}
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
                onInputChange={onChangeExchange}
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
          {orderbook &&
          orderbook.sellEntries.length === 0 &&
          orderbook.buyEntries.length === 0 ? (
            <Notification isWarning>
              No orders on the orderbook for this trading pair
            </Notification>
          ) : (
            <Fragment>
              <div className="orderbook__tables">
                <div className="orderbook__table orderbook__table-buy">
                  <div>
                    <div className="orderbook__head">
                      <div className="orderbook__head-row">
                        <div className="orderbook__head-cell">Cum. Vol.</div>
                        <div className="orderbook__head-cell">Vol.</div>
                        <div className="orderbook__head-cell">Bid</div>
                      </div>
                    </div>
                    <div className="orderbook__body">
                      {orderbook &&
                        orderbook.buyEntries.map((entry, index) => {
                          const volume = Number.parseFloat(
                            entry.volume,
                          ).toFixed(decimals);
                          const howMuch = Number.parseFloat(
                            entry.order.buy.howMuch,
                          ).toFixed(decimals);
                          const price = Number.parseFloat(
                            entry.order.price,
                          ).toFixed(decimals);

                          const onClickBuyOrder = () =>
                            isReadyToTrade &&
                            onClick &&
                            onClick(orderbook.buyEntries.slice(0, index + 1));

                          const calculatedBar = calculateBar(
                            orderbook.buyEntries[index - 1],
                            entry,
                          );

                          return (
                            <div
                              className="orderbook__body-row"
                              key={`${entry.order.id}-${index}`}
                              onClick={onClickBuyOrder}
                              style={{
                                cursor: isReadyToTrade ? 'pointer' : 'auto',
                              }}
                            >
                              <div className="orderbook__body-cell">
                                {volume}
                              </div>
                              <div className="orderbook__body-cell">
                                {howMuch}
                              </div>
                              <div className="orderbook__body-cell orderbook__body-cell--buy">
                                {price}
                              </div>
                              <div className="orderbook__bar orderbook__bar--buy">
                                <Bar
                                  widthBar={`${
                                    calculatedBar.entryPercentage > 100
                                      ? 100
                                      : calculatedBar.entryPercentage
                                  }%`}
                                  widthBorder={`${
                                    calculatedBar.percentageDiff
                                  }%`}
                                  leftSpaceBorder={`calc(100% - ${
                                    calculatedBar.entryPercentage
                                  }% ${calculatedBar.prevEntryPercentage >
                                    0.5 && '+ 1px'})`}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="orderbook__table orderbook__table-sell">
                  <div>
                    <div className="orderbook__head">
                      <div className="orderbook__head-row">
                        <div className="orderbook__head-cell">Ask</div>
                        <div className="orderbook__head-cell">Vol.</div>
                        <div className="orderbook__head-cell">Cum. Vol.</div>
                      </div>
                    </div>
                    <div className="orderbook__body">
                      {orderbook &&
                        orderbook.sellEntries.map((entry, index) => {
                          const volume = Number.parseFloat(
                            entry.volume,
                          ).toFixed(decimals);
                          const howMuch = Number.parseFloat(
                            entry.order.sell.howMuch,
                          ).toFixed(decimals);
                          const price = Number.parseFloat(
                            entry.order.price,
                          ).toFixed(decimals);

                          const onClickSellOrder = () =>
                            isReadyToTrade &&
                            onClick &&
                            onClick(orderbook.sellEntries.slice(0, index + 1));

                          const calculatedBar = calculateBar(
                            orderbook.sellEntries[index - 1],
                            entry,
                          );

                          return (
                            <div
                              className="orderbook__body-row"
                              key={`${entry.order.id}-${index}`}
                              onClick={onClickSellOrder}
                              style={{
                                cursor: isReadyToTrade ? 'pointer' : 'auto',
                              }}
                            >
                              <div className="orderbook__body-cell orderbook__body-cell--sell">
                                {price}
                              </div>
                              <div className="orderbook__body-cell">
                                {howMuch}
                              </div>
                              <div className="orderbook__body-cell">
                                {volume}
                              </div>

                              <div className="orderbook__bar orderbook__bar--sell">
                                <Bar
                                  widthBar={`${
                                    calculatedBar.entryPercentage > 100
                                      ? 100
                                      : calculatedBar.entryPercentage
                                  }%`}
                                  widthBorder={`${
                                    calculatedBar.percentageDiff
                                  }%`}
                                  leftSpaceBorder={`calc(${
                                    calculatedBar.entryPercentage
                                  }% - ${
                                    calculatedBar.percentageDiff
                                  }% ${calculatedBar.prevEntryPercentage >
                                    0.5 && '- 1px'})`}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Orderbook;
