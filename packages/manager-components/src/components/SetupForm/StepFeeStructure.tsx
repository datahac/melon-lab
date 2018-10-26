import React, { StatelessComponent } from 'react';
import Input from '~/blocks/Input';

import styles from './styles.css';

interface FormValues {
  name: string;
  exchanges: any;
  managementFee: string;
  performanceFee: string;
}

export interface StepFeeStructureProps {
  errors?: any;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleSubmit?: () => void;
  touched?: any;
  values: FormValues;
}

export const StepFeeStructure: StatelessComponent<StepFeeStructureProps> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  return (
    <div className="setup__step">
      <style jsx>{styles}</style>
      <h3>Fee structure</h3>
      <h4>Management fee</h4>
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.managementFee}
        required={true}
        name="managementFee"
        type="text"
        placeholder="Management fee"
        error={touched.managementFee && errors.managementFee}
      />
      <h4>Performance fee</h4>
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.performanceFee}
        required={true}
        name="performanceFee"
        type="text"
        placeholder="Performance fee"
        error={touched.performanceFee && errors.performanceFee}
      />
    </div>
  );
};

export default StepFeeStructure;
