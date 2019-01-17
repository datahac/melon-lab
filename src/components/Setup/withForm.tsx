import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withHandlers, compose } from 'recompose';
import gql from 'graphql-tag';

const uniqueFundQuery = gql`
  query UniqueFundQuery($name: String!) {
    fundByName(name: $name) {
      address
    }
  }
`;

const initialValues = {
  name: '',
  exchanges: [],
  terms: false,
  policies: {},
  fees: {
    performanceFee: '',
    managementFee: '',
  },
};

const withForm = withFormik({
  mapPropsToValues: props =>
    props.formValues ? { ...props.formValues } : initialValues,
  validationSchema: props =>
    Yup.object().shape({
      name: Yup.string()
        .required('Name is required.')
        .test(
          'is-unique',
          'There is already a fund with this name.',
          async value => {
            if (value) {
              const { data } = await props.client.query({
                query: uniqueFundQuery,
                variables: {
                  name: value,
                },
              });

              return !data.fundByName;
            }

            return false;
          },
        ),
      exchanges: Yup.array().required('Exchanges are required.'),
      terms: Yup.boolean().test(
        'is-checked',
        'Must Accept Terms and Conditions',
        value => (value !== true ? false : true),
      ),
      policies: Yup.object().shape({
        priceTolerance: Yup.number()
          .typeError('Price tolerance fee is required')
          .positive('Fee must be positive')
          .max(100, 'Fee can not be greater than 100')
          .integer('Fee must be an integer'),
      }),
      fees: Yup.object().shape({
        performanceFee: Yup.number()
          .typeError('Performance fee is required')
          .required('Performance fee is required')
          .positive('Fee must be positive')
          .max(100, 'Fee can not be greater than 100')
          .integer('Fee must be an integer'),
        managementFee: Yup.number()
          .typeError('Management fee is required')
          .required('Management fee is required')
          .positive('Fee must be positive')
          .max(100, 'Fee can not be greater than 100')
          .integer('Fee must be an integer'),
      }),
    }),
  enableReinitialize: true,
  handleSubmit: (values, form) => form.props.setFundValues(values),
});

const withFormHandlers = withHandlers({
  onActivatePolicy: props => value => {
    if (value in props.values.policies) {
      const tempValues = props.values.policies;
      delete tempValues[value];
      props.setFieldValue('policies', tempValues);
    } else {
      props.setFieldValue('policies', {
        ...props.values.policies,
        [value]: 0,
      });
    }
  },
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
  onClickNext: props => async e => {
    e.preventDefault();
    const fields = props.steps[props.page].validateFields;

    if (typeof fields !== 'undefined' && fields) {
      await fields.map(item => props.setFieldTouched(item, true, true));

      props.validateForm().then(errors => {
        if (
          fields.some(item =>
            item.includes('.')
              ? errors[item.split('.')[0]] &&
                errors[item.split('.')[0]][item.split('.')[1]]
              : errors[item],
          )
        ) {
          return props.setPage(props.page);
        }

        return props.setPage(props.page + 1);
      });
    }

    return props.setPage(props.page + 1);
  },
  onClickPrev: props => e => {
    e.preventDefault();
    return props.setPage(props.page - 1);
  },
});

export default compose(
  withForm,
  withFormHandlers,
);
