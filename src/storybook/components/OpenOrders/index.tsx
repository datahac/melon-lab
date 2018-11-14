import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
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

export interface Order {
  buyHowMuch: string;
  buySymbol: string;
  id: number;
  price: string;
  sellHowMuch: string;
  sellSymbol: string;
  timestamp: string;
  type: string;
}

export interface OpenOrdersProps {
  isManager?: boolean;
  isReadyToTrade?: boolean;
  onClick: (id, buySymbol, sellSymbol) => void;
  orders?: Order[];
}

export const OpenOrders: StatelessComponent<OpenOrdersProps> = ({
  isManager,
  isReadyToTrade,
  onClick,
  orders = [],
}) => {
  const typeCellClassNames = (type: string) =>
    classNames(
      'open-orders__cell',
      {
        'open-orders__cell--red': type === 'sell',
      },
      {
        'open-orders__cell--green': type === 'buy',
      },
    );

  return (
    <div className="open-orders">
      <style jsx>{styles}</style>
      <div className="open-orders__table-wrap">
        {orders.length > 0 ? (
          <Table>
            <TableHead>
              <Row isHead={true} size={isManager && 'small'}>
                <CellHead noPadding={false}>Time</CellHead>
                <CellHead>Id</CellHead>
                <CellHead>Type</CellHead>
                <CellHead>Buy</CellHead>
                <CellHead>Sell</CellHead>
                <CellHead>Price</CellHead>
                <CellHead>Buy Quantity</CellHead>
                <CellHead noPadding={false}>Sell Quantity</CellHead>
                {isManager && <CellHead noPadding={false} />}
              </Row>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map(order => {
                  return (
                    <Row key={order.id} size={isManager && 'small'}>
                      <CellBody noPadding={false}>
                        {format(
                          parseInt(order.timestamp),
                          'DD. MMM YYYY HH:mm',
                        )}
                      </CellBody>
                      <CellBody>{order.id}</CellBody>
                      <CellBody>
                        <span className={typeCellClassNames(order.type)}>
                          {order.type}
                        </span>
                      </CellBody>
                      <CellBody>{order.sellSymbol}</CellBody>
                      <CellBody>{order.buySymbol}</CellBody>
                      <CellBody>{displayNumber(order.price)}</CellBody>
                      <CellBody>{displayNumber(order.sellHowMuch)}</CellBody>
                      <CellBody noPadding={false}>
                        {displayNumber(order.buyHowMuch)}
                      </CellBody>
                      {isManager && (
                        <CellBody noPadding={false}>
                          <Button
                            size="small"
                            style="secondary"
                            onClick={() =>
                              onClick(
                                order.id,
                                order.buySymbol,
                                order.sellSymbol,
                              )
                            }
                            disabled={!isReadyToTrade}
                          >
                            Cancel
                          </Button>
                        </CellBody>
                      )}
                    </Row>
                  );
                })}
            </TableBody>
          </Table>
        ) : (
          <p className="open-orders__no-items">No open orders</p>
        )}
      </div>
    </div>
  );
};

export default OpenOrders;
