import React, { StatelessComponent } from 'react';
import Input from '~/blocks/Input';
import Selector from '~/components/Selector';
import availableExchangeContracts from '~/shared/utils/availableExchangeContracts';

import styles from './styles.css';

interface FormValues {
  name: string;
  exchanges: any;
  assets: any;
}

export interface StepNameProps {
  errors?: any;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleSubmit?: () => void;
  touched?: any;
  values: FormValues;
  address: string;
  onChangeExchanges;
  onChangeAssets;
  availableAssets;
}

export const StepName: StatelessComponent<StepNameProps> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
  onChangeExchanges,
  onChangeAssets,
  availableAssets,
}) => {
  return (
    <div className="setup__step">
      <style jsx>{styles}</style>
      <h3>Fund</h3>
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        required={true}
        name="name"
        type="text"
        placeholder="Fund name"
        error={touched.name && errors.name}
      />

      <h4>Exchanges</h4>
      <Selector
        errors={touched.exchanges && errors.exchanges}
        handleOnBlur={handleBlur}
        handleOnChange={onChangeExchanges}
        availableItems={availableExchangeContracts}
        selectedItems={values.exchanges}
      />

      <h4>Allowed Subscription Assets</h4>
      <Selector
        errors={touched.assets && errors.assets}
        handleOnBlur={handleBlur}
        handleOnChange={onChangeAssets}
        availableItems={availableAssets}
        selectedItems={values.assets}
      />
    </div>
  );
};

export default StepName;
