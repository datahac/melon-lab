import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import styles from './styles.css';
import * as Tm from '@melonproject/token-math';

export interface HoldingProps {
  fraction?: number;
  balance?: Tm.QuantityInterface;
  price?: Tm.PriceInterface;
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
      {(fraction && fraction > 0 && <div className="holding__bar" />) || null}
      <div className="holding__wrapper">
        <div className="holding__symbol">
          {symbol}
          <span className="holding__name">{name}</span>
        </div>
        <div className="holding__price">
          {price && Tm.toFixed(price, decimals)}
        </div>
        <div className="holding__balance">
          {balance && Tm.toFixed(balance, decimals)}
        </div>
      </div>
    </div>
  );
};

export default Holding;
