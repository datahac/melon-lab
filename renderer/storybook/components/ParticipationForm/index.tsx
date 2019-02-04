import React, { Fragment, StatelessComponent } from 'react';
import * as Tm from '@melonproject/token-math';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Spinner from '~/blocks/Spinner';
import * as R from 'ramda';
import Notification from '~/blocks/Notification';

import styles from './styles.css';

export interface FormValues {
  price: Tm.PriceInterface;
  quantity: Tm.QuantityInterface;
  total: Tm.QuantityInterface;
  type: string;
}

export interface FormErrors {
  quantity?: string;
  total?: string;
  price?: string;
}

export interface ParticipationFormProps {
  decimals?: number;
  touched?: any;
  errors: FormErrors;
  values: FormValues;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  handleChange?: () => void;
  loading?: boolean;
  noFund?: boolean;
  address?: string;
  sharePrice?: Tm.PriceInterface;
}

const ParticipationForm: StatelessComponent<ParticipationFormProps> = ({
  decimals = 6,
  errors,
  handleBlur,
  handleSubmit,
  handleChange,
  touched,
  values,
  loading,
  noFund,
  address,
  sharePrice,
}) => {
  const numberPlaceholder = (0).toFixed(decimals);
  return (
    <Fragment>
      <style jsx>{styles}</style>
      {loading ? (
        <div className="participation-form__spinner">
          <Spinner icon size="small" />
        </div>
      ) : (
        <div className="participation-form">
          {noFund ? (
            <Notification isError>
              No fund with address {address} found.
            </Notification>
          ) : (
            <Fragment>
              <Form onSubmit={handleSubmit}>
                <div className="participation-form__input">
                  <Input
                    value={
                      values.quantity && Tm.toFixed(values.quantity, decimals)
                    }
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
                <div className="participation-form__current-price">
                  <span>
                    Current share price: {sharePrice && Tm.toFixed(sharePrice)}
                  </span>
                </div>

                <div className="participation-form__input">
                  <Input
                    value={values.price && Tm.toFixed(values.price, decimals)}
                    type="number"
                    label={`Max price (${R.path(
                      ['quote', 'token', 'symbol'],
                      values.price,
                    )})`}
                    name="price"
                    insideLabel
                    placeholder={numberPlaceholder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={true}
                    formatNumber={true}
                    error={touched.price && errors.price}
                    decimals={decimals}
                  />
                </div>
                <div className="participation-form__input">
                  <Input
                    value={values.total && Tm.toFixed(values.total, decimals)}
                    type="number"
                    label={`Total (${R.path(
                      ['token', 'symbol'],
                      values.total,
                    )})`}
                    name="total"
                    insideLabel
                    placeholder={numberPlaceholder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={true}
                    formatNumber={true}
                    error={touched.total && errors.total}
                    decimals={decimals}
                  />
                </div>

                <div className="participation-form__input">
                  <Button type="submit">Submit request</Button>
                </div>
              </Form>
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ParticipationForm;
