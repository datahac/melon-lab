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
      <style jsx={true}>{styles}</style>
      <div className="open-orders__table-wrap">
        {orders.length > 0 ? (
          <Table>
            <TableHead>
              <Row isHead={true} size={isManager && 'small'}>
                <CellHead noPadding={false}>Buy</CellHead>
                <CellHead>Sell</CellHead>
                <CellHead>Price</CellHead>
                <CellHead noPadding={false}>Quantity</CellHead>
                {isManager && <CellHead noPadding={false} />}
              </Row>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map(order => {
                  const buy =
                    order.type === 'ASK' ? order.trade.quote : order.trade.base;
                  const sell =
                    order.type === 'ASK' ? order.trade.base : order.trade.quote;

                  return (
                    <Row key={order.id} size="medium">
                      <CellBody noPadding={false}>{sell.token.symbol}</CellBody>
                      <CellBody>{buy.token.symbol}</CellBody>
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
