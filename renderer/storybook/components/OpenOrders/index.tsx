import React, { StatelessComponent } from 'react';
import classNames from 'classnames';
import Button from '~/blocks/Button';
import {
  CellBody,
  CellHead,
  Row,
  Table,
  TableBody,
  TableHead,
} from '~/blocks/Table';
import displayQuantity from '~/shared/utils/displayQuantity';

import styles from './styles.css';

export interface Order {
  buySymbol: string;
  id: number;
  price: string;
  quantity: string;
  timestamp: string;
  type: string;
}

export interface OpenOrdersProps {
  isManager?: boolean;
  canInteract?: boolean;
  onClick: (id) => void;
  orders?: Order[];
}

export const OpenOrders: StatelessComponent<OpenOrdersProps> = ({
  isManager,
  canInteract,
  onClick,
  orders = [],
}) => {
  return (
    <div className="open-orders">
      <style jsx>{styles}</style>
      <div className="open-orders__table-wrap">
        {orders.length > 0 ? (
          <Table>
            <TableHead>
              <Row isHead={true} size={isManager && 'small'}>
                <CellHead noPadding={false}>Asset</CellHead>
                <CellHead>Type</CellHead>
                <CellHead>Price</CellHead>
                <CellHead noPadding={false}>Quantity</CellHead>
                {isManager && <CellHead noPadding={false} />}
              </Row>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map(order => {
                  const orderTypeClassName = type =>
                    classNames('open-orders__type', {
                      [`open-orders__type--${type.toLowerCase()}`]: type,
                    });

                  return (
                    <Row key={order.id} size="small">
                      <CellBody noPadding={false}>
                        {order.trade.base.token.symbol}
                      </CellBody>
                      <CellBody>
                        <span className={orderTypeClassName(order.type)}>
                          {order.type === 'BID' ? 'Buy' : 'Sell'}
                        </span>
                      </CellBody>
                      <CellBody>
                        {order.price && displayQuantity(order.price)}
                      </CellBody>
                      <CellBody>
                        {order.volume && displayQuantity(order.volume)}
                      </CellBody>
                      {isManager && (
                        <CellBody noPadding={false} width={50}>
                          <Button
                            icon="cross"
                            size="small"
                            style="clear"
                            onClick={() => onClick(order)}
                            disabled={!canInteract}
                          />
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
