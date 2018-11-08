import React, { StatelessComponent } from 'react';
import NumberFormat from 'react-number-format';

import styles from './styles.css';

export interface OrderInfoProps {
  ask?: number;
  bid?: number;
  lastPrice?: number;
  tokens: {
    [key: string]: {
      name: string;
      balance: number;
    };
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
        {lastPrice ? (
          <NumberFormat
            value={lastPrice}
            decimalScale={4}
            fixedDecimalScale={true}
            displayType="text"
            thousandSeparator={true}
          />
        ) : (
          <span>N/A</span>
        )}
        <span className="order-info__price-desc">Last Price</span>
      </div>
      <div className="order-info__bid">
        {bid ? (
          <NumberFormat
            value={bid}
            decimalScale={4}
            fixedDecimalScale={true}
            displayType="text"
            type="text"
            thousandSeparator={true}
          />
        ) : (
          <span>N/A</span>
        )}
        <span className="order-info__price-desc">Bid</span>
      </div>
      <div className="order-info__ask">
        {ask ? (
          <NumberFormat
            value={ask}
            decimalScale={4}
            fixedDecimalScale={true}
            displayType="text"
            thousandSeparator={true}
          />
        ) : (
          <span>N/A</span>
        )}
        <span className="order-info__price-desc">Ask</span>
      </div>
    </div>
    <div className="order-info__balances">
      <div className="order-info__balance">
        <span className="order-info__balance-desc">
          {tokens.baseToken.name}:
        </span>{' '}
        <NumberFormat
          value={tokens.baseToken.balance}
          decimalScale={4}
          fixedDecimalScale={true}
          displayType="text"
          thousandSeparator={true}
        />
      </div>
      <div className="order-info__balance">
        <span className="order-info__balance-desc">
          {tokens.quoteToken.name}:
        </span>{' '}
        <NumberFormat
          value={tokens.quoteToken.balance}
          decimalScale={4}
          fixedDecimalScale={true}
          displayType="text"
          thousandSeparator={true}
        />
      </div>
    </div>
  </div>
);

export default OrderInfo;
