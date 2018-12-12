import React, { StatelessComponent, Fragment } from 'react';
import Input from '~/blocks/Input';
import {
  CellBody,
  CellHead,
  Row,
  Table,
  TableBody,
  TableHead,
} from '~/blocks/Table';
import { add, toBigNumber } from '~/utils/functionalBigNumber';

import styles from './styles.css';

interface FormValues {
  gasPrice: number;
}

export interface FeeFormProps {
  errors?: any;
  fees?: any;
  handleBlur: () => void;
  handleChange: () => void;
  touched?: any;
  values: FormValues;
  text?: string;
}

export const FeeForm: StatelessComponent<FeeFormProps> = ({
  errors,
  fees,
  handleBlur,
  handleChange,
  touched,
  values,
  text,
}) => {
  const calcEntryTotal = (gasLimit: number) => {
    return (
      gasLimit &&
      values.gasPrice &&
      toBigNumber((values.gasPrice * gasLimit) / 10 ** 9).toFixed(4)
    );
  };

  const mapped = fees.map(fee => (fee.gasLimit * values.gasPrice) / 10 ** 9);
  const total =
    mapped && mapped.length ? toBigNumber(add(...mapped)).toFixed(4) : 0;

  return (
    <div className="fee-form">
      <style jsx>{styles}</style>
      {text && <p>{text}</p>}
      <div className="fee-form__input">
        <Input
          value={values.gasPrice}
          label="Gas price"
          name="gasPrice"
          insideLabel="true"
          onChange={handleChange}
          onBlur={handleBlur}
          required={true}
          formatNumber={true}
          error={touched.gasPrice && errors.gasPrice}
        />
      </div>

      {fees && (
        <div>
          <Table>
            <TableHead>
              <Row isHead>
                <CellHead>Description</CellHead>
                <CellHead>Gas Limit</CellHead>
                <CellHead>Total</CellHead>
              </Row>
            </TableHead>
            <TableBody>
              {fees.map((entry, i: number) => (
                <Row key={`fee-${i}`}>
                  <CellBody>{entry.description}</CellBody>
                  <CellBody>{entry.gasLimit}</CellBody>
                  <CellBody>Ξ {calcEntryTotal(entry.gasLimit)}</CellBody>
                </Row>
              ))}

              <Row>
                <CellHead />
                <CellHead />
                <CellHead>Ξ {total}</CellHead>
              </Row>
            </TableBody>
          </Table>
          <p>
            If you do not change the gas price field, the default gas price will
            be used. If you wish to set the gas price according to network
            conditions, please refer to{' '}
            <a href="https://ethgasstation.info/" target="_blank">
              Eth Gas Station.
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default FeeForm;
