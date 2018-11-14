import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import {
  CellBody,
  CellHead,
  Row,
  Table,
  TableBody,
  TableHead,
} from '~/blocks/Table';
import format from 'date-fns/format';
import displayNumber from '~/utils/displayNumber';

import styles from './styles.css';

export interface RecentTradesProps {
  baseAsset: string;
  quoteAsset: string;
  trades?: any;
}

export const RecentTrades: StatelessComponent<RecentTradesProps> = ({
  baseAsset,
  quoteAsset,
  trades,
}) => {
  const typeCellClassNames = (type: string) =>
    classNames(
      'recent-trades__cell',
      {
        'recent-trades__cell--red': type === 'sell',
      },
      {
        'recent-trades__cell--green': type === 'buy',
      },
    );

  return (
    <div className="recent-trades">
      <style jsx>{styles}</style>
      <div className="recent-trades__table-wrap">
        {trades.length > 0 ? (
          <Table>
            <TableHead>
              <Row isHead={true}>
                <CellHead noPadding={false}>Time</CellHead>
                <CellHead>Type</CellHead>
                <CellHead textAlign="right">
                  Price ({baseAsset}/{quoteAsset})
                </CellHead>
                <CellHead textAlign="right" noPadding={false}>
                  Amount ({baseAsset})
                </CellHead>
              </Row>
            </TableHead>
            <TableBody>
              {trades.length > 0 &&
                trades.map((trade, index) => (
                  <Row key={index}>
                    <CellBody noPadding={false}>
                      {format(parseInt(trade.timestamp), 'DD. MMM YYYY HH:mm')}
                    </CellBody>
                    <CellBody>
                      <span className={typeCellClassNames(trade.type)}>
                        {trade.type}
                      </span>
                    </CellBody>
                    <CellBody textAlign="right">
                      {displayNumber(trade.price)}
                    </CellBody>
                    <CellBody textAlign="right" noPadding={false}>
                      {displayNumber(trade.quantity)}
                    </CellBody>
                  </Row>
                ))}
            </TableBody>
          </Table>
        ) : (
          <p className="recent-trades__no-items">No recent trades</p>
        )}
      </div>
    </div>
  );
};

export default RecentTrades;
