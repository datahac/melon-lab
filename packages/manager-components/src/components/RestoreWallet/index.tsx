import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Spinner from '~/blocks/Spinner';
import Link from '~/blocks/Link';

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

        <div className="restore-wallet__actions">
          <div className="restore-wallet__action">
            <Link
              style="secondary"
              size="medium"
              href={{
                pathname: '/wallet',
              }}
            >
              Cancel
            </Link>
          </div>
          <div className="restore-wallet__action">
            <Button type="submit" style="primary">
              Restore
            </Button>
          </div>
        </div>
      </Form>
    )}
  </div>
);

export default RestoreWallet;
