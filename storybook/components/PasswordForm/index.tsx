import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';

import styles from './styles.css';

interface FormValues {
  password: string;
}

export interface PasswordFormProps {
  errors?: any;
  handleBlur?: () => void;
  handleChange: () => void;
  handleReset: () => void;
  handleSubmit: () => void;
  onCancel: () => void;
  onChange?: () => void;
  touched?: any;
  values: FormValues;
}

export const PasswordForm: StatelessComponent<PasswordFormProps> = ({
  errors,
  handleBlur,
  handleChange,
  handleReset,
  handleSubmit,
  onCancel,
  touched,
  values,
}) => {
  const handleCancel = () => {
    handleReset();
    onCancel();
  };

  return (
    <div className="password-form">
      <style jsx>{styles}</style>
      <Form onSubmit={handleSubmit}>
        <div className="password-form__input">
          <Input
            value={values.password}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            required={true}
            error={touched.password && errors.password}
          />
        </div>
        <div className="password-form__buttons">
          <div className="password-form__button">
            <Button type="button" style="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          <div className="password-form__button">
            <Button type="submit">Confirm</Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PasswordForm;
