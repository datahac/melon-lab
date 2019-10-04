import React, { StatelessComponent } from 'react';
import Input from '~/blocks/Input';
import { CellBody, CellHead, Row, Table, TableBody, TableHead } from '~/blocks/Table';
import Notification from '~/blocks/Notification';
import * as Tm from '@melonproject/token-math';

import styles from './styles.css';

interface FormValues {
  gasPrice: number;
}

interface FormErrors {
  gasPrice: string;
}

export interface FeeFormProps {
  error?: Error;
  errors?: FormErrors;
  handleBlur?: () => void;
  handleChange?: () => void;
  touched?: any;
  values: FormValues;
  text?: string;
  gasLimit: number;
  total: Tm.QuantityInterface;
  description?: string;
  amguInEth: Tm.QuantityInterface;
  incentiveInEth: Tm.QuantityInterface;
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
  total,
  description,
  amguInEth,
  incentiveInEth,
}) => (
  <div className="fee-form">
    <style jsx>{styles}</style>
    {error && <Notification isError>{error.message}</Notification>}
    {!error && text && <p>{text}</p>}
    {!error && (
      <div className="fee-form__input">
        <Input
          value={values.gasPrice}
          label="Gas price (GWEI)"
          name="gasPrice"
          insideLabel={true}
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
            <Row isHead={true}>
              <CellHead>Description</CellHead>
              <CellHead />
              <CellHead textAlign="right">Cost</CellHead>
            </Row>
          </TableHead>
          <TableBody>
            <Row>
              <CellBody>{description}</CellBody>
              <CellBody>Gas limit: {gasLimit}</CellBody>
              <CellBody textAlign="right">Ξ {total && Tm.toFixed(total, 6)}</CellBody>
            </Row>
            {amguInEth && (
              <Row>
                <CellBody>Amgu</CellBody>
                <CellBody />
                <CellBody textAlign="right">Ξ {Tm.toFixed(amguInEth, 6)}</CellBody>
              </Row>
            )}
            {incentiveInEth && (
              <Row>
                <CellBody>Incentive</CellBody>
                <CellBody />
                <CellBody textAlign="right">Ξ {Tm.toFixed(incentiveInEth, 6)}</CellBody>
              </Row>
            )}
          </TableBody>
        </Table>
        <p>
          If you do not change the gas price field, the default gas price will be used. If you wish to set the gas price
          according to network conditions, please refer to{' '}
          <a href="https://ethgasstation.info/" target="_blank">
            Eth Gas Station.
          </a>
        </p>
      </div>
    )}
  </div>
);

export default FeeForm;
