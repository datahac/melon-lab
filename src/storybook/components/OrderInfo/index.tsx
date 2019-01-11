import React, { StatelessComponent, Fragment } from 'react';
import * as Tm from '@melonproject/token-math';
import * as R from 'ramda';

import styles from './styles.css';

export interface OrderInfoProps {
  ask?: Tm.price.PriceInterface;
  bid?: Tm.price.PriceInterface;
  lastPrice?: Tm.price.PriceInterface;
  baseToken: Tm.quantity.QuantityInterface;
  quoteToken: Tm.quantity.QuantityInterface;
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
          <Fragment>{Tm.price.toFixed(lastPrice)}</Fragment>
        ) : (
          <span>N/A</span>
        )}
        <span className="order-info__price-desc">Last Price</span>
      </div>
      <div className="order-info__bid">
        {bid ? <Fragment>{Tm.price.toFixed(bid)}</Fragment> : <span>N/A</span>}
        <span className="order-info__price-desc">Bid</span>
      </div>
      <div className="order-info__ask">
        {ask ? <Fragment>{Tm.price.toFixed(ask)}</Fragment> : <span>N/A</span>}
        <span className="order-info__price-desc">Ask</span>
      </div>
    </div>
    <div className="order-info__balances">
      <div className="order-info__balance">
        <span className="order-info__balance-desc">
          {R.path(['token', 'symbol'], baseToken)}:
        </span>{' '}
        {baseToken && Tm.quantity.toFixed(baseToken)}
      </div>
      <div className="order-info__balance">
        <span className="order-info__balance-desc">
          {R.path(['token', 'symbol'], quoteToken)}:
        </span>{' '}
        {quoteToken && Tm.quantity.toFixed(quoteToken)}
      </div>
    </div>
  </div>
);

export default OrderInfo;
