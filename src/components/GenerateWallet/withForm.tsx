import { withFormik } from 'formik';
import * as Yup from 'yup';
import bip39 from 'bip39';

export default withFormik({
  mapPropsToValues: () => ({
    mnemonic: '',
    password: '',
  }),
  validationSchema: props =>
    Yup.object().shape({
      mnemonic: Yup.string()
        .required('Mnemonic is required.')
        .test('is-valid', 'Mnemonic is not valid', value => bip39.validateMnemonic(value))
        .test('is-generated-mnemonic', 'Please type in the genearted mnemonic', value => value === props.mnemonic),
      password: Yup.string()
        .required('Password is required.')
        .min(8, 'Password needs to be at least 8 chars long. For your security!')
        .max(64, 'Password is too long. Please reduce your password to max 64 chars!'),
    }),
  enableReinitialize: true,
  handleSubmit: (values, form) => form.props.onSubmit && form.props.onSubmit(values),
});
