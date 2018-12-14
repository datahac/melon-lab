import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Toggle from '~/blocks/Toggle';

import styles from './styles.css';

interface FormValues {
  price: string;
  quantity: string;
  total: string;
  type: string;
}

export interface ParticipationFormProps {
  decimals?: number;
  quoteToken?: {
    symbol: string;
    decimals: number;
  };
  setup: boolean;
  touched?: any;
  errors?: any;
  values: FormValues;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  handleChange?: () => void;
}

const ParticipationForm: StatelessComponent<ParticipationFormProps> = ({
  decimals = 0,
  errors,
  handleBlur,
  handleSubmit,
  handleChange,
  quoteToken,
  setup,
  touched,
  values,
}) => {
  const numberPlaceholder = (0).toFixed(decimals);

  return (
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
            value={values.quantity}
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
                value={values.price}
                type="number"
                label={`Price (${quoteToken && quoteToken.symbol})`}
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
                value={values.total}
                type="number"
                label={`Total (${quoteToken && quoteToken.symbol})`}
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
  );
};

export default ParticipationForm;
