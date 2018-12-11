import { withFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  gasPrice: '5',
};

const withForm = withFormik({
  mapPropsToValues: props => ({
    ...(props.formValues ? props.formValues : initialValues),
  }),
  validationSchema: props =>
    Yup.object().shape({
      gasPrice: Yup.number()
        .required('Gas price is required.')
        .moreThan(0, 'Please enter a valid gas price'),
    }),
  enableReinitialize: true,
  handleSubmit: (values, form) => {
    form.props.execute(values.gasPrice);
  },
});

export default withForm;
