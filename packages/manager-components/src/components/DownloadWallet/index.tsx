import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Spinner from '~/blocks/Spinner';
import Link from '~/blocks/Link';

import styles from './styles.css';

interface FormValues {
  password: string;
}

export interface DownloadWalletProps {
  errors?: any;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  handleChange?: () => void;
  hasStoredWallet: boolean;
  touched?: any;
  values: FormValues;
  loading?: boolean;
}

export const DownloadWallet: StatelessComponent<DownloadWalletProps> = ({
  errors,
  handleBlur,
  handleSubmit,
  handleChange,
  touched,
  values,
  loading,
}) => (
  <div className="download-wallet">
    <style jsx>{styles}</style>
    {loading ? (
      <Spinner icon size="small" text="Preparing download" />
    ) : (
      <Form onSubmit={handleSubmit}>
        <div className="download-wallet__input">
          <Input
            maxlength={64}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            required={true}
            name="password"
            type="password"
            placeholder="Set a Password for your file"
            error={touched.password && errors.password}
          />
        </div>
        <div className="download-wallet__actions">
          <div className="download-wallet__action">
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
          <div className="download-wallet__action">
            <Button type="submit" style="primary">
              Download
            </Button>
          </div>
        </div>
      </Form>
    )}
  </div>
);

export default DownloadWallet;
