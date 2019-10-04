import { storiesOf } from '@storybook/react';
import React from 'react';
import { CellBody, CellHead, Row, Table, TableBody, TableHead } from './index';

const data = [
  {
    price: '0.0522',
    quantity: '191.4630',
    timestamp: '23. Jul 2018 14:59',
    type: 'sell',
  },
  {
    price: '0.0521',
    quantity: '192.0272',
    timestamp: '23. Jul 2018 14:59',
    type: 'sell',
  },
];

storiesOf('Blocks|Table', module).add('Default', () => {
  return (
    <Table>
      <TableHead>
        <Row isHead={true}>
          <CellHead>Price</CellHead>
          <CellHead>Quantity</CellHead>
          <CellHead>Date</CellHead>
          <CellHead>Type</CellHead>
        </Row>
      </TableHead>
      <TableBody>
        {data.map(item => (
          <Row>
            <CellBody>{item.price}</CellBody>
            <CellBody>{item.quantity}</CellBody>
            <CellBody>{item.timestamp}</CellBody>
            <CellBody>{item.type}</CellBody>
          </Row>
        ))}
      </TableBody>
    </Table>
  );
});
