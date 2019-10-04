import React, { Fragment, StatelessComponent } from 'react';
import * as Tm from '@melonproject/token-math';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface FormValues {
  quantity: Tm.QuantityInterface;
}

export interface FormErrors {
  quantity?: string;
}

export interface RedeemFormProps {
  decimals?: number;
  touched?: any;
  errors: FormErrors;
  values: FormValues;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  handleChange?: () => void;
  loading?: boolean;
}

const RedeemForm: StatelessComponent<RedeemFormProps> = ({
  decimals = 6,
  errors,
  handleBlur,
  handleSubmit,
  handleChange,
  touched,
  values,
  loading,
}) => {
  const numberPlaceholder = (0).toFixed(decimals);
  return (
    <Fragment>
      <style jsx>{styles}</style>
      {loading ? (
        <div className="redeem-form__spinner">
          <Spinner icon size="small" />
        </div>
      ) : (
        <div className="participation-form">
          <Form onSubmit={handleSubmit}>
            <div className="redeem-form__input">
              <Input
                value={values.quantity && Tm.toFixed(values.quantity, decimals)}
                type="number"
                label="Quantity (Shares)"
                name="quantity"
                insideLabel
                placeholder={numberPlaceholder}
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
                formatNumber={true}
                error={touched.quantity && errors.quantity}
                decimals={decimals}
              />
            </div>

            <div className="redeem-form__input">
              <Button type="submit">Submit request</Button>
            </div>
          </Form>
        </div>
      )}
    </Fragment>
  );
};

export default RedeemForm;
