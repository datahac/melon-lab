import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Notification from '~/blocks/Notification';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

interface FormValues {
  password: string;
}

export interface LoadWalletProps {
  errors?: any;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  handleChange?: () => void;
  touched?: any;
  values: FormValues;
  loading?: boolean;
  serverError?: string;
}

export const LoadWallet: StatelessComponent<LoadWalletProps> = ({
  errors,
  handleBlur,
  handleSubmit,
  handleChange,
  touched,
  values,
  loading,
  serverError,
}) => (
  <div className="load-wallet">
    <style jsx>{styles}</style>
    <h3>Load Wallet</h3>
    <div className="load-wallet__error">{serverError && <Notification isError>{serverError}</Notification>}</div>
    {loading ? (
      <Spinner icon size="small" text="Load Wallet..." />
    ) : (
      <Form onSubmit={handleSubmit}>
        <div className="load-wallet__input">
          <Input
            maxlength={64}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            required={true}
            name="password"
            type="password"
            placeholder="Password"
            error={touched.password && errors.password}
          />
        </div>
        <Button type="submit" style="secondary">
          Load
        </Button>
      </Form>
    )}
  </div>
);

export default LoadWallet;
