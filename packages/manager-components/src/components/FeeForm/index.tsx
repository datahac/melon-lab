import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import {
  CellBody,
  CellHead,
  Row,
  Table,
  TableBody,
  TableHead,
} from '~/blocks/Table';
import { add, toBigNumber } from '../../utils/functionalBigNumber';

import styles from './styles.css';

interface FormValues {
  gasPrice: number;
}

export interface FeeFormProps {
  errors?: any;
  fees?: any;
  handleBlur: () => void;
  handleReset: () => void;
  handleSubmit: () => void;
  onCancel: () => void;
  onChange: () => void;
  touched?: any;
  values: FormValues;
}

export const FeeForm: StatelessComponent<FeeFormProps> = ({
  errors,
  fees,
  handleBlur,
  handleReset,
  handleSubmit,
  onCancel,
  onChange,
  touched,
  values,
}) => {
  const handleCancel = () => {
    handleReset();
    onCancel();
  };

  const calcEntryTotal = (gasLimit: number) =>
    toBigNumber((values.gasPrice * gasLimit) / 10 ** 9).toFixed(4);

  const total = toBigNumber(
    add(...fees.map(e => (e.gasLimit * values.gasPrice) / 10 ** 9)),
  ).toFixed(4);

  return (
    <div className="fee-form">
      <style jsx>{styles}</style>
      <Form>
        <div className="fee-form__input">
          <Input
            value={values.gasPrice}
            type="number"
            label="Gas price"
            name="gasPrice"
            insideLabel="true"
            onChange={onChange}
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
              If you do not change the gas price field, the default gas price
              will be used. If you wish to set the gas price according to
              network conditions, please refer to{' '}
              <a href="https://ethgasstation.info/" target="_blank">
                Eth Gas Station.
              </a>
            </p>
          </div>
        )}

        <div className="fee-form__buttons">
          <div className="fee-form__button">
            <Button type="button" style="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          <div className="fee-form__button">
            <Button type="submit" onClick={handleSubmit}>
              Confirm
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FeeForm;
