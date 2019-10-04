import React from 'react';
import { CellBody, CellHead, Row, Table, TableBody, TableHead } from './index';

describe('Table', () => {
  const defaultElement = <Table>Default button</Table>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('TableBody', () => {
  const defaultElement = <TableBody>Default button</TableBody>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('TableHead', () => {
  const defaultElement = <TableHead>Default button</TableHead>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('CellBody', () => {
  const defaultElement = <CellBody>Default button</CellBody>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('CellHead', () => {
  const defaultElement = <CellHead>Default button</CellHead>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Row', () => {
  const defaultElement = <Row>Default button</Row>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
