import { withFormik } from 'formik';
import * as Yup from 'yup';
import Setup from './index';

const initialValues = {
  name: '',
};

const withFormValidation = withFormik({
  mapPropsToValues: props =>
    props.formValues ? { ...props.formValues } : initialValues,
  validationSchema: Yup.object().shape({
    name: Yup.string().required('name is required.'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

export default withFormValidation(Setup);
