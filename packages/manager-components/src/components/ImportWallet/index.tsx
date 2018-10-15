import React, { Fragment, StatelessComponent } from 'react';
import Dropzone from 'react-dropzone';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Spinner from '~/blocks/Spinner';
import Notification from '../../blocks/Notification';
import Link from '~/blocks/Link';

import styles from './styles.css';

interface FormValues {
  password: string;
}

export interface ImportWalletProps {
  errors?: any;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  handleChange?: () => void;
  touched?: any;
  values: FormValues;
  loading?: boolean;
  onImportFile: () => void;
  file?: string;
  serverError?: string;
}

export const ImportWallet: StatelessComponent<ImportWalletProps> = ({
  errors,
  handleBlur,
  handleSubmit,
  handleChange,
  touched,
  values,
  loading,
  onImportFile,
  file,
  serverError,
}) => (
  <div className="import-wallet">
    <style jsx>{styles}</style>
    {serverError && (
      <div className="import-wallet__error">
        <Notification isError>{serverError}</Notification>
      </div>
    )}
    {loading ? (
      <Spinner icon size="small" text="Import Wallet..." />
    ) : (
      <Fragment>
        {!file ? (
          <div className="import-wallet__dropzone">
            <Dropzone
              onDrop={onImportFile}
              style={{
                width: '100%',
                border: '1px dotted black',
                padding: 10,
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <p>Select a wallet JSON file from your computer</p>
            </Dropzone>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <div className="import-wallet__input">
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
            <div className="import-wallet__actions">
              <div className="import-wallet__action">
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
              <div className="import-wallet__action">
                <Button type="submit" style="primary">
                  Import
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Fragment>
    )}
  </div>
);

export default ImportWallet;
