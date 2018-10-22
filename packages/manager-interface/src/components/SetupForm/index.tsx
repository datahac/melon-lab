import { compose, withState, withHandlers, withProps } from 'recompose';
import SetupForm from '~/components/SetupForm';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const withFormProps = withProps(props => {
  return {
    steps: [
      {
        key: 'name',
        name: 'Name',
        validateFields: ['name'],
      },
      {
        key: 'exchanges',
        name: 'Exchanges',
        validateFields: ['exchanges'],
      },
      {
        key: 'policies',
        name: 'Policies',
      },
      {
        key: 'terms',
        name: 'Terms & Conditions',
        validateFields: ['terms'],
      },
    ],
  };
});

const withPageState = withState('page', 'setPage', 0);

const initialValues = {
  name: '',
  exchanges: [],
  terms: false,
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
  onClickNext: props => e => {
    const fields = props.steps[props.page].validateFields;
    if (fields) {
      fields.map(item => props.setFieldTouched(item));
      props.validateForm().then(errors => {
        if (fields.some(item => errors[item])) {
          return props.setPage(props.page);
        }
        return props.setPage(props.page + 1);
      });
    }
    return props.setPage(props.page + 1);
  },
  onClickPrev: props => e => {
    return props.setPage(props.page - 1);
  },
});

const withFormikForm = withFormik({
  mapPropsToValues: () => initialValues,
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    exchanges: Yup.array().required('Exchanges are required.'),
    terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

export default compose(
  withFormikForm,
  withPageState,
  withFormProps,
  withFormHandlers,
)(SetupForm);
