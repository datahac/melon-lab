import { compose, withState, withHandlers } from 'recompose';
import Setup from '~/components/Setup';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const withPolicyModalState = withState(
  'showPolicyModal',
  'setShowPolicyModal',
  false,
);

const initialValues = {
  name: '',
  exchanges: [],
};

const withFormHandlers = withHandlers({
  onChangeExchanges: props => event => {
    const value = event.target.value;
    const { exchanges } = props.values;
    if (!exchanges.includes(value)) {
      props.setFieldValue('exchanges', [...exchanges, value]);
    } else {
      props.setFieldValue('exchanges', [
        ...exchanges.filter(item => item !== value),
      ]);
    }
  },
});

const withFormValidation = withFormik({
  mapPropsToValues: () => initialValues,
  validationSchema: Yup.object().shape({
    name: Yup.string().required('name is required.'),
    exchanges: Yup.array().required('exchanges are required.'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

export default compose(
  withFormValidation,
  withPolicyModalState,
  withFormHandlers,
)(Setup);
