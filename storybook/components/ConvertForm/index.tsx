import React, { Fragment, StatelessComponent } from 'react';
import * as Tm from '@melonproject/token-math';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';

import styles from './styles.css';

export interface FormValues {
  quantity: Tm.QuantityInterface;
}

export interface FormErrors {
  quantity?: string;
}

export interface ParticipationFormProps {
  decimals?: number;
  touched?: any;
  errors: FormErrors;
  values: FormValues;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  handleChange?: () => void;
  executeRequest?: () => void;
  cancelRequest?: () => void;
  ethBalance?: Tm.QuantityInterface;
  wethBalance?: Tm.QuantityInterface;
  actionLabel?: string;
}

const ConvertForm: StatelessComponent<ParticipationFormProps> = ({
  decimals = 6,
  errors,
  handleBlur,
  handleSubmit,
  handleChange,
  touched,
  values,
  ethBalance,
  wethBalance,
  actionLabel = 'Wrap Ether',
}) => {
  const numberPlaceholder = (0).toFixed(decimals);

  return (
    <Fragment>
      <style jsx>{styles}</style>
      <Form onSubmit={handleSubmit}>
        <div className="convert-form__balances">
          {ethBalance && <span className="convert-form__balance">ETH: {Tm.toFixed(ethBalance)}</span>}
          {wethBalance && <span className="convert-form__balance">WETH: {Tm.toFixed(wethBalance)}</span>}
        </div>
        <div className="convert-form__input">
          <Input
            value={values.quantity && Tm.toFixed(values.quantity, decimals)}
            type="number"
            label="Quantity"
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
        <div className="convert-form__input">
          <Button type="submit">{actionLabel}</Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default ConvertForm;
