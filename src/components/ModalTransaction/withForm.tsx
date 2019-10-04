import { withFormik } from 'formik';
import * as Yup from 'yup';

const withForm = withFormik({
  mapPropsToValues: (props: any) => ({
    gasPrice: props.gasPrice.toString(),
  }),
  validationSchema: props =>
    Yup.object().shape({
      gasPrice: Yup.number()
        .required('Gas price is required.')
        .moreThan(0, 'Please enter a valid gas price'),
    }),
  enableReinitialize: true,
  handleSubmit: (values, form) => {
    form.props.execute({ variables: values });
  },
});

export default withForm;
