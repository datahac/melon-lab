import React, { Fragment, StatelessComponent } from 'react';
import * as Tm from '@melonproject/token-math';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Spinner from '~/blocks/Spinner';
import * as R from 'ramda';
import Notification from '~/blocks/Notification';

import styles from './styles.css';
import Dropdown from '~/blocks/Dropdown';

export interface FormValues {
  price: Tm.PriceInterface;
  quantity: Tm.QuantityInterface;
  total: Tm.QuantityInterface;
  type: string;
  asset: string;
}

export interface FormErrors {
  quantity?: string;
  total?: string;
  price?: string;
  asset?: string;
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
  address?: string;
  sharePrice?: Tm.PriceInterface;
  isWaiting?: boolean;
  readyToExecute?: boolean;
  isInitialRequest?: boolean;
  isExpired?: boolean;
  ethBalance?: Tm.QuantityInterface;
  wethBalance?: Tm.QuantityInterface;
  allowedAssets: Tm.TokenInterface[];
  loading: boolean;
}

const ParticipationForm: StatelessComponent<ParticipationFormProps> = ({
  decimals = 6,
  errors,
  handleBlur,
  handleSubmit,
  handleChange,
  touched,
  values,
  sharePrice,
  isWaiting,
  readyToExecute,
  executeRequest,
  isInitialRequest,
  isExpired,
  cancelRequest,
  allowedAssets,
  loading,
}) => {
  const numberPlaceholder = (0).toFixed(decimals);

  return (
    <Fragment>
      <style jsx>{styles}</style>
      {(!loading && !allowedAssets.length && (
        <Notification isWarning>
          This fund does not currently allow investment.
        </Notification>
      )) ||
        null}

      {(allowedAssets.length && (
        <div className="participation-form">
          {(isWaiting && !isExpired && (
            <Notification isWarning>
              You have a valid investment request pending in this fund. Please
              come back between the next pricefeed update and within 24 hours
              from now, in order to execute that investment request. Please note
              this investment request may be executed by another party as well.
            </Notification>
          )) ||
            null}

          {(readyToExecute && (
            <Fragment>
              <Notification isWarning>
                Execute your investment request!
              </Notification>
              <hr />
              <Button onClick={executeRequest}>Execute Request</Button>
            </Fragment>
          )) ||
            null}

          {(isExpired && (
            <Fragment>
              <Notification isWarning>Your request is expired!</Notification>
              <hr />
              <Button onClick={cancelRequest}>Cancel Request</Button>
            </Fragment>
          )) ||
            null}

          {!loading && !isWaiting && !readyToExecute && (
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
                  disabled={isInitialRequest}
                />
              </div>

              <div className="participation-form__input">
                <Input
                  value={values.total && Tm.toFixed(values.total, decimals)}
                  type="number"
                  label={`Total (${R.path(['token', 'symbol'], values.total)})`}
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
          )}
        </div>
      )) ||
        null}
    </Fragment>
  );
};

export default ParticipationForm;
