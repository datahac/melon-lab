import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import displayNumber from '~/utils/displayNumber';

import styles from './styles.css';

export interface HoldingProps {
  fraction?: string;
  balance?: string;
  price?: string;
  symbol?: string;
  onClickHolding?: () => void;
}

const Holding: StatelessComponent<HoldingProps> = ({
  fraction,
  balance,
  price,
  tokenSymbol,
  onClickHolding,
  active,
  tokenName,
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
          {tokenSymbol}
          <span className="holding__name">{tokenName}</span>
        </div>
        <div className="holding__price">{displayNumber(price)}</div>
        <div className="holding__balance">{displayNumber(balance)}</div>
      </div>
    </div>
  );
};

export default Holding;
