import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Spinner from '~/blocks/Spinner';
import {
  CellBody,
  CellHead,
  Row,
  Table,
  TableBody,
  TableHead,
} from '~/blocks/Table';
import displayNumber from '~/utils/displayNumber';
import Holding from '~/blocks/Holding';

import styles from './styles.css';

export interface Holding {
  balance: string;
  symbol: string;
  fraction: string;
  price: string;
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
        <Spinner icon />
      </div>
    ) : (
      <div className="holdings__table-wrap">
        {holdings &&
          holdings.map(asset => (
            <Holding
              key={asset.symbol}
              fraction={asset.fraction}
              tokenSymbol={asset.tokenSymbol}
              tokenName={asset.tokenName}
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
