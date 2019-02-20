import React, { Fragment, StatelessComponent } from 'react';
import * as Tm from '@melonproject/token-math';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Spinner from '~/blocks/Spinner';
import styles from './styles.css';
import MultiDropdown from '~/blocks/MultiDropdown';

interface FormValues {
  allowedAssets: string;
}

export interface InvestAssetsProps {
  errors?: any;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleSubmit?: () => void;
  touched?: any;
  values: FormValues;
  loading: boolean;
  availableAssets: Tm.TokenInterface[];
}

export const InvestAssetsForm: StatelessComponent<InvestAssetsProps> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
  loading,
  availableAssets,
  handleSubmit,
}) => (
  <Fragment>
    <style jsx>{styles}</style>
    {loading ? (
      <div className="invest-assets-form__spinner">
        <Spinner icon size="small" />
      </div>
    ) : (
      <div className="invest-assets-form">
        <Form onSubmit={handleSubmit}>
          <div className="invest-assets-form__input">
            <MultiDropdown
              name="allowedAssets"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.allowedAssets}
              options={availableAssets.map(token => ({
                value: token.address,
                label: token.symbol,
              }))}
              error={
                !!touched.allowedAssets &&
                !!errors.allowedAssets &&
                errors.allowedAssets
              }
            />
          </div>

          <div className="invest-assets-form__input">
            <Button type="submit">Set allowed assets</Button>
          </div>
        </Form>
      </div>
    )}
  </Fragment>
);

export default InvestAssetsForm;
