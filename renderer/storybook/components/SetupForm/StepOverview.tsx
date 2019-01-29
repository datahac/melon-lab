import React, { StatelessComponent, Fragment } from 'react';
import { CellBody, CellHead, Row, Table, TableBody } from '~/blocks/Table';
import * as R from 'ramda';

import styles from './styles.css';

export interface StepTermsProps {
  values;
  availableExchangeContracts;
  availablePolicies;
}

export const StepTerms: StatelessComponent<StepTermsProps> = ({
  values,
  availablePolicies,
  availableExchangeContracts,
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
                <Row key={`${keyName}-${i}`}>
                  <CellHead>{availablePolicies[keyName].name}: </CellHead>

                  <CellBody>
                    {(keyName === 'assetWhitelist' ||
                      keyName === 'assetBlacklist') && (
                      <ul className="setup__list">
                        {values.policies[keyName].map(item => (
                          <li
                            className="setup__list-item"
                            key={`${keyName}-${item.value}`}
                          >
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    )}

                    {keyName === 'userWhitelist' && (
                      <ul className="setup__list">
                        {values.policies[keyName].split('\n').map(item => (
                          <li
                            className="setup__list-item"
                            key={`${keyName}-${item}`}
                          >
                            {item}
                            {availablePolicies[keyName].unit}
                          </li>
                        ))}
                      </ul>
                    )}

                    {(keyName === 'priceTolerance' ||
                      keyName === 'maxPositions' ||
                      keyName === 'maxConcentration') && (
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
};

export default StepTerms;
