import React, { StatelessComponent, Fragment } from 'react';
import { CellBody, CellHead, Row, Table, TableBody } from '~/blocks/Table';
import availablePolicies from '~/shared/utils/availablePolicies';
import availableExchangeContracts from '~/shared/utils/availableExchangeContracts';
import * as R from 'ramda';

import styles from './styles.css';

export interface StepTermsProps {
  values;
}

export const StepTerms: StatelessComponent<StepTermsProps> = ({ values }) => (
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
          <CellHead>Management Fee</CellHead>
          <CellBody>{values.fees && values.fees.managementFee}%</CellBody>
        </Row>
        <Row>
          <CellHead>Performance Fee</CellHead>
          <CellBody>{values.fees && values.fees.performanceFee}%</CellBody>
        </Row>
        {!R.isEmpty(values.policies) && (
          <Fragment>
            {Object.keys(values.policies).map((keyName, i) => (
              <Row key={i}>
                <CellHead>{availablePolicies[keyName].name}: </CellHead>

                <CellBody>
                  {values.policies[keyName].toString().includes('\n') ? (
                    <ul className="setup__list">
                      {values.policies[keyName].split('\n').map(item => (
                        <li className="setup__list-item" key={item}>
                          {item}
                          {availablePolicies[keyName].unit}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Fragment>
                      {values.policies[keyName]}
                      {availablePolicies[keyName].unit}
                    </Fragment>
                  )}
                </CellBody>
              </Row>
            ))}
          </Fragment>
        )}
      </TableBody>
    </Table>
  </div>
);

export default StepTerms;
