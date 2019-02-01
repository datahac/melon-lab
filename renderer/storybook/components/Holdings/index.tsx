import React, { StatelessComponent } from 'react';
import Spinner from '~/blocks/Spinner';
import Holding from '~/blocks/Holding';
import * as Tm from '@melonproject/token-math';

import styles from './styles.css';

export interface Holding {
  balance: Tm.QuantityInterface;
  symbol: string;
  fraction: string;
  price: Tm.PriceInterface;
}

export interface HoldingsProps {
  holdings?: Holding[];
  quoteAsset?: string;
  baseAsset?: string;
  loading?: boolean;
  onClick: (asset) => void;
}

export const Holdings: StatelessComponent<HoldingsProps> = ({
  holdings,
  quoteAsset,
  baseAsset,
  loading,
  onClick,
}) => (
  <div className="holdings" id="holdings">
    <style jsx>{styles}</style>
    {loading ? (
      <div className="holdings__loading">
        <Spinner icon size="small" />
      </div>
    ) : (
      <div className="holdings__table-wrap">
        {holdings &&
          holdings.map(asset => (
            <Holding
              key={asset.symbol}
              fraction={asset.fraction}
              symbol={asset.symbol}
              name={asset.name}
              price={asset.price}
              balance={asset.balance}
              active={baseAsset === asset.symbol}
              onClickHolding={
                !(asset.symbol === quoteAsset) ? () => onClick(asset) : null
              }
            />
          ))}
      </div>
    )}
  </div>
);

export default Holdings;
