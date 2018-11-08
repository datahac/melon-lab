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
  isReadyToTrade?: boolean;
}

export const Holdings: StatelessComponent<HoldingsProps> = ({
  holdings,
  quoteAsset,
  baseAsset,
  loading,
  onClick,
  isReadyToTrade,
}) => {
  return (
    <div className="holdings" id="holdings">
      <style jsx>{styles}</style>
      <h3>Fund Holdings</h3>
      {loading ? (
        <div className="holdings__loading">
          <Spinner icon />
        </div>
      ) : (
        <div className="holdings__table-wrap">
          <Table>
            <TableHead>
              <Row isHead={true}>
                <CellHead>Asset</CellHead>
                <CellHead>Quantity</CellHead>
                <CellHead textAlign="right">% of portfolio</CellHead>
                <CellHead textAlign="right">Price (in {quoteAsset})</CellHead>
                <CellHead textAlign="right" />
              </Row>
            </TableHead>
            <TableBody>
              {holdings &&
                holdings.map(asset => (
                  <Row
                    key={asset.symbol}
                    size="small"
                    active={baseAsset === asset.symbol}
                  >
                    <CellBody>{asset.symbol}</CellBody>
                    <CellBody>{displayNumber(asset.balance)}</CellBody>
                    <CellBody textAlign="right">
                      {displayNumber(asset.fraction)}%
                    </CellBody>
                    <CellBody textAlign="right">
                      {displayNumber(asset.price)}
                    </CellBody>
                    <CellBody
                      textAlign="right"
                      cellClass="holdings__action-cell"
                    >
                      {asset.symbol === quoteAsset ? (
                        <span className="holdings__quote-asset" />
                      ) : asset.symbol !== quoteAsset && isReadyToTrade ? (
                        <Button
                          size="small"
                          onClick={() => onClick(asset)}
                          style="secondary"
                        >
                          Buy/Sell
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          onClick={() => onClick(asset)}
                          style="secondary"
                        >
                          See Orderbook
                        </Button>
                      )}
                    </CellBody>
                  </Row>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Holdings;
