import React, { StatelessComponent, Fragment } from 'react';
import { toFixed, QuantityInterface } from '@melonproject/token-math/quantity';
import {
  PriceInterface,
  toFixed as toFixedPrice,
} from '@melonproject/token-math/price';
import * as R from 'ramda';

import styles from './styles.css';

export interface OrderInfoProps {
  ask?: PriceInterface;
  bid?: PriceInterface;
  lastPrice?: PriceInterface;
  baseToken: QuantityInterface;
  quoteToken: QuantityInterface;
}

const OrderInfo: StatelessComponent<OrderInfoProps> = ({
  ask,
  bid,
  lastPrice,
  baseToken,
  quoteToken,
}) => (
  <div className="order-info">
    <style jsx>{styles}</style>
    <div className="order-info__prices">
      <div className="order-info__last-price">
        {lastPrice ? (
          <Fragment>{toFixedPrice(lastPrice)}</Fragment>
        ) : (
          <span>N/A</span>
        )}
        <span className="order-info__price-desc">Last Price</span>
      </div>
      <div className="order-info__bid">
        {bid ? <Fragment>{toFixedPrice(bid)}</Fragment> : <span>N/A</span>}
        <span className="order-info__price-desc">Bid</span>
      </div>
      <div className="order-info__ask">
        {ask ? <Fragment>{toFixedPrice(ask)}</Fragment> : <span>N/A</span>}
        <span className="order-info__price-desc">Ask</span>
      </div>
    </div>
    <div className="order-info__balances">
      <div className="order-info__balance">
        <span className="order-info__balance-desc">
          {R.path(['token', 'symbol'], baseToken)}:
        </span>{' '}
        {baseToken && toFixed(baseToken)}
      </div>
      <div className="order-info__balance">
        <span className="order-info__balance-desc">
          {R.path(['token', 'symbol'], quoteToken)}:
        </span>{' '}
        {quoteToken && toFixed(quoteToken)}
      </div>
    </div>
  </div>
);

export default OrderInfo;
