import bip39 from 'bip39';
import { withFormik } from 'formik';
import { compose } from 'recompose';
import * as Yup from 'yup';
import RestoreWallet from './index';

const initialValues = {
  mnemonic: '',
  password: '',
};

const withFormValidation = withFormik({
  mapPropsToValues: props =>
    props.formValues ? { ...props.formValues } : initialValues,
  validationSchema: Yup.object().shape({
    mnemonic: Yup.string()
      .required('mnemonic is required.')
      .test('is-valid', 'Mnemonic is not valid', value =>
        bip39.validateMnemonic(value),
      ),
    password: Yup.string()
      .required('Password is required.')
      .min(8, 'Password needs to be at least 8 chars long. For your security!')
      .max(
        64,
        'Password is too long. Please reduce your password to max 64 chars!',
      ),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

export default compose(withFormValidation)(RestoreWallet);
