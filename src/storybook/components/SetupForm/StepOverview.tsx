import React, { StatelessComponent } from 'react';
import { CellBody, CellHead, Row, Table, TableBody } from '~/blocks/Table';
import availablePolicies from '~/utils/availablePolicies';

import styles from './styles.css';

export interface StepTermsProps {
  values;
  availableExchangeContracts;
}

export const StepTerms: StatelessComponent<StepTermsProps> = ({
  values,
  availableExchangeContracts,
}) => (
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
              const exchange = availableExchangeContracts.find(
                exchange => exchange.value === item,
              );
              return <div key={exchange.value}>{exchange.text}</div>;
            })}
          </CellBody>
        </Row>
        <Row>
          <CellHead>Fees</CellHead>
          <CellBody>
            <div>Management Fee: {values.managementFee}%</div>
            <div>Performance Fee: {values.performanceFee}%</div>
          </CellBody>
        </Row>
        <Row>
          <CellHead>Policies</CellHead>
          <CellBody>
            {Object.keys(values.policies).map((keyName, i) => (
              <div key={i}>
                {availablePolicies[keyName].name}: {values.policies[keyName]}
                {availablePolicies[keyName].unit}
              </div>
            ))}
          </CellBody>
        </Row>
      </TableBody>
    </Table>
  </div>
);

export default StepTerms;
