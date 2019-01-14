import React, { Fragment, StatelessComponent } from 'react';
import * as Tm from '@melonproject/token-math';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Toggle from '~/blocks/Toggle';
import Spinner from '~/blocks/Spinner';
import * as R from 'ramda';

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
  setup: boolean;
  touched?: any;
  errors: FormErrors;
  values: FormValues;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  handleChange?: () => void;
  loading?: boolean;
}

const ParticipationForm: StatelessComponent<ParticipationFormProps> = ({
  decimals = 4,
  errors,
  handleBlur,
  handleSubmit,
  handleChange,
  setup,
  touched,
  values,
  loading,
}) => {
  const numberPlaceholder = (0).toFixed(decimals);

  return (
    <Fragment>
      {loading ? (
        <div className="participation-form__spinner">
          <Spinner icon size="small" />
        </div>
      ) : (
        <div className="participation-form">
          <style jsx>{styles}</style>
          <Form onSubmit={handleSubmit}>
            {!setup && (
              <div className="participation-form__toggles">
                <div className="participation-form__toggle">
                  <Toggle
                    name="type"
                    value="Invest"
                    text="Invest"
                    isChecked={values.type === 'Invest'}
                    onChange={handleChange}
                  />
                </div>
                <div className="participation-form__toggle">
                  <Toggle
                    name="type"
                    value="Slices"
                    text="Slices"
                    isChecked={values.type === 'Slices'}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="participation-form__input">
              <Input
                value={values.quantity && Tm.toFixed(values.quantity, decimals)}
                type="number"
                label="Quantity (Shares)"
                name="quantity"
                insideLabel="true"
                placeholder={numberPlaceholder}
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
                formatNumber={true}
                error={touched.quantity && errors.quantity}
                decimals={decimals}
              />
            </div>

            {values.type !== 'Slices' && (
              <Fragment>
                <div className="participation-form__input">
                  <Input
                    value={values.price && Tm.toFixed(values.price, decimals)}
                    type="number"
                    label={`Price (${R.path(
                      ['quote', 'token', 'symbol'],
                      values.price,
                    )})`}
                    name="price"
                    insideLabel="true"
                    placeholder={numberPlaceholder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={true}
                    formatNumber={true}
                    error={touched.price && errors.price}
                    disabled={true}
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
                    insideLabel="true"
                    placeholder={numberPlaceholder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={true}
                    formatNumber={true}
                    error={touched.total && errors.total}
                    decimals={decimals}
                  />
                </div>
              </Fragment>
            )}

            <div className="participation-form__input">
              <Button type="submit">Submit request</Button>
            </div>
          </Form>
        </div>
      )}
    </Fragment>
  );
};

export default ParticipationForm;
