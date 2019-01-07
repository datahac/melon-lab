import React, { StatelessComponent, Fragment } from 'react';
import { toFixed, QuantityInterface } from '@melonproject/token-math/quantity';
import * as R from 'ramda';

import styles from './styles.css';

export interface OrderInfoProps {
  ask?: number;
  bid?: number;
  lastPrice?: number;
  tokens: {
    baseToken: QuantityInterface;
    quoteToken: QuantityInterface;
  };
}

const OrderInfo: StatelessComponent<OrderInfoProps> = ({
  ask,
  bid,
  lastPrice,
  tokens,
}) => (
  <div className="order-info">
    <style jsx>{styles}</style>
    <div className="order-info__prices">
      <div className="order-info__last-price">
        {lastPrice ? <Fragment>{lastPrice}</Fragment> : <span>N/A</span>}
        <span className="order-info__price-desc">Last Price</span>
      </div>
      <div className="order-info__bid">
        {bid ? <Fragment>{bid}</Fragment> : <span>N/A</span>}
        <span className="order-info__price-desc">Bid</span>
      </div>
      <div className="order-info__ask">
        {ask ? <Fragment>{ask}</Fragment> : <span>N/A</span>}
        <span className="order-info__price-desc">Ask</span>
      </div>
    </div>
    {tokens && (
      <div className="order-info__balances">
        <div className="order-info__balance">
          <span className="order-info__balance-desc">
            {tokens.baseToken.token.symbol}:
          </span>{' '}
          {toFixed(tokens.baseToken)}
        </div>
        <div className="order-info__balance">
          <span className="order-info__balance-desc">
            {tokens.quoteToken.token.symbol}:
          </span>{' '}
          {toFixed(tokens.quoteToken)}
        </div>
      </div>
    )}
  </div>
);

export default OrderInfo;
