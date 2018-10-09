import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

interface FormValues {
  mnemonic: string;
  password: string;
}

export interface RestoreWalletProps {
  errors?: any;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  handleChange?: () => void;
  touched?: any;
  values: FormValues;
  loading?: boolean;
}

export const RestoreWallet: StatelessComponent<RestoreWalletProps> = ({
  errors,
  handleBlur,
  handleSubmit,
  handleChange,
  touched,
  values,
  loading,
}) => (
  <div className="restore-wallet">
    <style jsx>{styles}</style>
    <h1>Restore Wallet</h1>
    {loading ? (
      <Spinner icon size="small" text="Restore Wallet..." />
    ) : (
      <Form onSubmit={handleSubmit}>
        <p>Please type your 12-words mnemonic:</p>
        <div className="restore-wallet__input">
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.mnemonic}
            required={true}
            name="mnemonic"
            type="text"
            placeholder="mnemonic"
            error={touched.mnemonic && errors.mnemonic}
          />
        </div>
        <div className="restore-wallet__input">
          <Input
            maxlength={64}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            required={true}
            name="password"
            type="password"
            placeholder="Set a Password"
            error={touched.password && errors.password}
          />
        </div>
        <Button type="submit" style="secondary">
          Restore
        </Button>
      </Form>
    )}
  </div>
);

export default RestoreWallet;
