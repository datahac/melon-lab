import classNames from 'classnames';
import React, { StatelessComponent, Fragment } from 'react';
import styles from './styles.css';
import * as Tm from '@melonproject/token-math';
import { CellBody, Row } from '../Table';
import Button from '../Button';

export interface HoldingProps {
  fraction?: number;
  balance?: Tm.QuantityInterface;
  locked?: Tm.QuantityInterface;
  price?: Tm.PriceInterface;
  name?: string;
  symbol?: string;
  active?: boolean;
  isManager: boolean;
  onClickHolding?: () => void;
  onClickRelease?: () => void;
  decimals?: number;
}

const Holding: StatelessComponent<HoldingProps> = ({
  decimals = 4,
  balance,
  locked,
  price,
  symbol,
  name,
  isManager,
  onClickHolding,
  onClickRelease,
  active,
}) => {
  const holdingClassNames = classNames('holding', {
    'holding--active': active,
  });

  return (
    <Fragment>
      <style jsx>{styles}</style>
      <style jsx>{`
        .holding {
          cursor: ${onClickHolding ? 'pointer' : 'auto'};
        }
      `}</style>
      <Row className={holdingClassNames} onClick={onClickHolding}>
        <CellBody noPadding={false}>
          <span className="holding__symbol">
            {symbol}
            {isManager && locked && !Tm.isZero(locked) && (
              <span className="holding__release">
                <Button
                  style="danger"
                  size="tiny"
                  alt={Tm.toFixed(locked, decimals)}
                  onClick={onClickRelease}
                >
                  Release
                </Button>
              </span>
            )}
            <span className="holding__name">{name}</span>
          </span>
        </CellBody>
        <CellBody noPadding={false}>
          <div className="holding__price">
            {price && Tm.toFixed(price, decimals)}
          </div>
        </CellBody>
        <CellBody noPadding={false}>
          <div className="holding__balance">
            {balance && Tm.toFixed(balance, decimals)}
          </div>
        </CellBody>
      </Row>
    </Fragment>
  );
};

export default Holding;
