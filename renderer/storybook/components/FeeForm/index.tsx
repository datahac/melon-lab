import React, { StatelessComponent } from 'react';
import Input from '~/blocks/Input';
import {
  CellBody,
  CellHead,
  Row,
  Table,
  TableBody,
  TableHead,
} from '~/blocks/Table';

import styles from './styles.css';

interface FormValues {
  gasPrice: number;
}

interface FormErrors {
  gasPrice: string;
}

export interface FeeFormProps {
  error?: Error;
  errors: FormErrors;
  handleBlur: () => void;
  handleChange: () => void;
  touched?: any;
  values: FormValues;
  text?: string;
  gasLimit: number;
}

export const FeeForm: StatelessComponent<FeeFormProps> = ({
  error,
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
  text,
  gasLimit,
}) => {
  const calcEntryTotal = (gasLimit: number) => {
    return gasLimit && values.gasPrice && values.gasPrice * gasLimit;
  };
  const total = gasLimit * values.gasPrice;

  return (
    <div className="fee-form">
      <style jsx>{styles}</style>
      {error && <p>{error.message}</p>}
      {!error && text && <p>{text}</p>}
      {!error && (
        <div className="fee-form__input">
          <Input
            value={values.gasPrice.toString()}
            label="Gas price (WEI)"
            name="gasPrice"
            insideLabel
            onChange={handleChange}
            onBlur={handleBlur}
            required={true}
            formatNumber={true}
            error={touched.gasPrice && errors.gasPrice}
          />
        </div>
      )}

      {!error && gasLimit && (
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
              <Row>
                <CellBody />
                <CellBody>{gasLimit}</CellBody>
                <CellBody>Ξ {calcEntryTotal(gasLimit)}</CellBody>
              </Row>

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
