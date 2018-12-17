import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import styles from './styles.css';
import { toFixed } from '@melonproject/token-math/quantity';
import { toFixed as toFixedPrice } from '@melonproject/token-math/price';

export interface HoldingProps {
  fraction?: number;
  balance?: string;
  price?: string;
  name?: string;
  symbol?: string;
  active?: boolean;
  onClickHolding?: () => void;
  decimals?: number;
}

const Holding: StatelessComponent<HoldingProps> = ({
  decimals = 4,
  fraction,
  balance,
  price,
  symbol,
  name,
  onClickHolding,
  active,
}) => {
  const holdingClassNames = classNames('holding', {
    'holding--active': active,
  });

  return (
    <div className={holdingClassNames} onClick={onClickHolding}>
      <style jsx>{styles}</style>
      <style jsx>{`
        .holding {
          cursor: ${onClickHolding ? 'pointer' : 'auto'};
        }

        .holding__bar {
          width: ${fraction}%;
        }
      `}</style>
      {fraction > 0 && <div className="holding__bar" />}
      <div className="holding__wrapper">
        <div className="holding__symbol">
          {symbol}
          <span className="holding__name">{name}</span>
        </div>
        <div className="holding__price">
          {price && toFixedPrice(price, decimals)}
        </div>
        <div className="holding__balance">
          {balance && toFixed(balance, decimals)}
        </div>
      </div>
    </div>
  );
};

export default Holding;
