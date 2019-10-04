import React, { StatelessComponent, Fragment } from 'react';
import { CellBody, CellHead, Row, Table, TableBody } from '~/blocks/Table';
import * as R from 'ramda';

import styles from './styles.css';

export interface StepOverviewProps {
  values;
  availableExchangeContracts;
  availableAssets;
}

export const StepOverview: StatelessComponent<StepOverviewProps> = ({
  values,
  availableExchangeContracts,
  availableAssets,
}) => {
  return (
    <div className="setup__step">
      <style jsx>{styles}</style>
      <h3>Overview</h3>
      <Table>
        <TableBody>
          <Row>
            <CellHead>Fund name</CellHead>
            <CellBody>{values.name}</CellBody>
          </Row>
          <Row>
            <CellHead>Allowed exchanges</CellHead>
            <CellBody>
              {values.exchanges.map(item => {
                const exchange = availableExchangeContracts.find(exchange => exchange.value === item);
                return <div key={exchange.value}>{exchange.label}</div>;
              })}
            </CellBody>
          </Row>
          <Row>
            <CellHead>Allowed Subscription Assets</CellHead>
            <CellBody>
              {values.assets.map(item => {
                const asset = availableAssets.find(asset => asset.value.toLowerCase() === item.toLowerCase());
                return <div key={asset.value}>{asset.label}</div>;
              })}
            </CellBody>
          </Row>
          <Row>
            <CellHead>Management Fee</CellHead>
            <CellBody>{values.fees && values.fees.managementFee}%</CellBody>
          </Row>
          <Row>
            <CellHead>Performance Fee</CellHead>
            <CellBody>{values.fees && values.fees.performanceFee}%</CellBody>
          </Row>
          <Row>
            <CellHead>Performance Fee Period</CellHead>
            <CellBody>{values.fees && values.fees.feePeriod} days</CellBody>
          </Row>
        </TableBody>
      </Table>
    </div>
  );
};

export default StepOverview;
