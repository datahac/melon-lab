import React, { StatelessComponent } from 'react';
import styles from './styles.css';
import Spinner from '~/blocks/Spinner';
import Table, { TableHead, Row, CellHead, TableBody, CellBody } from '~/blocks/Table';

export interface PoliciesInformationProps {
  policies: any;
  loading: boolean;
}

export const PoliciesInformation: StatelessComponent<PoliciesInformationProps> = ({ policies, loading }) => {
  // console.log(policies);
  return (
    <div className="policies">
      <style jsx>{styles}</style>

      {loading && (
        <div className="policies__spinner">
          <Spinner icon size="small" />
        </div>
      )}

      {!loading && !policies.length && <p className="policies__no-items">No registered policies</p>}

      {!loading && !!policies.length && (
        <div className="policies__table-wrap">
          <Table>
            <TableHead>
              <Row isHead={true}>
                <CellHead>Name</CellHead>
                <CellHead>Parameters</CellHead>
              </Row>
            </TableHead>
            <TableBody>
              {policies.map((policy, key) => (
                <Row key={`${key}:${policy.address}`} size="small">
                  <CellBody>{policy.name}</CellBody>
                  <CellBody>{policy.parameters}</CellBody>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default PoliciesInformation;
