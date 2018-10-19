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
        fields: ['name'],
      },
      {
        key: 'exchanges',
        name: 'Exchanges',
        fields: ['exchanges'],
      },
      {
        key: 'policies',
        name: 'Policies',
      },
      {
        key: 'terms',
        name: 'Terms & Conditions',
        fields: ['terms'],
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
  onClickNext: props => event => {
    const pageFields = props.steps[props.page].fields;
    if (pageFields) {
      pageFields.map(item => props.setFieldTouched(item));
      return props.validateForm().then(errors => {
        if (pageFields.some(item => errors[item])) {
          return true;
        }
        return false;
      });
    }
  },
});

const withFormikForm = withFormik({
  mapPropsToValues: () => initialValues,
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    exchanges: Yup.array().required('Exchanges are required.'),
    terms: Yup.boolean().required('Terms ire required.'),
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
