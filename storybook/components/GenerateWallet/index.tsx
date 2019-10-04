import React, { Fragment, StatelessComponent } from 'react';
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
export interface GenerateWalletProps {
  mnemonic: string;
  loading?: boolean;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  handleChange?: () => void;
  touched?: any;
  values: FormValues;
  errors?: any;
  showForm: boolean;
  setShowForm: (state) => void;
}

export const GenerateWallet: StatelessComponent<GenerateWalletProps> = ({
  mnemonic,
  loading,
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  showForm,
  setShowForm,
}) => (
  <div className="generate-wallet">
    <style jsx>{styles}</style>
    {loading ? (
      <Spinner icon size="small" text="Generating Wallet..." />
    ) : (
      <Fragment>
        {!showForm ? (
          <Fragment>
            <p>
              The standard bip39 is used to generate a mnemonic phrase, from which your wallet will be cryptographically
              derived.
            </p>
            <p>
              <b>
                Please write down the following mnemonic and store it in a safe place! If you loose your mnemonic you
                will not be able to access your fund again. If someone else gets a copy of this, they can take over your
                wallet & fund and steal your price!
              </b>
            </p>
            <p className="generate-wallet__mnemonic">{mnemonic}</p>

            <div className="generate-wallet__actions">
              <div className="generate-wallet__action">
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
              <div className="generate-wallet__action">
                <Button style="primary" onClick={() => setShowForm(true)}>
                  Confirm
                </Button>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>Please repeat your mnemonic and set a password.</p>
            <Form onSubmit={handleSubmit}>
              <div className="generate-wallet__input">
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mnemonic}
                  required={true}
                  name="mnemonic"
                  type="text"
                  placeholder="Repeat mnemonic"
                  error={touched.mnemonic && errors.mnemonic}
                />
              </div>
              <div className="generate-wallet__input">
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

              <div className="generate-wallet__actions">
                <div className="generate-wallet__action">
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
                <div className="generate-wallet__action">
                  <Button type="submit" style="primary">
                    Create
                  </Button>
                </div>
              </div>
            </Form>
          </Fragment>
        )}
      </Fragment>
    )}
  </div>
);

export default GenerateWallet;
