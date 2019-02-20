import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withHandlers, compose } from 'recompose';
import gql from 'graphql-tag';
import availablePolicies from '~/shared/utils/availablePolicies';
import * as R from 'ramda';

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
  authInvestAssets: [{ value: 'WETH', label: 'WETH' }],
  terms: false,
  policies: {},
  fees: {
    performanceFee: '0',
    managementFee: '0',
    feePeriod: '90',
  },
};

const withForm = withFormik({
  mapPropsToValues: props =>
    props.formValues ? { ...props.formValues } : initialValues,
  validationSchema: props =>
    Yup.object().shape({
      ...(props.page === 0
        ? {
            name: Yup.string().required('Name is required.'),
            // // TODO: Make this work again
            // .test(
            //   'is-unique',
            //   'There is already a fund with this name',
            //   async value => {
            //     if (value) {
            //       const { data } = await props.client.query({
            //         query: uniqueFundQuery,
            //         variables: {
            //           name: value,
            //         },
            //       });

            //       return !data.fundByName;
            //     }
            //     return false;
            //   },
            // ),
            exchanges: Yup.array().min(1, 'Min one exchange is required'),
          }
        : {}),

      ...(props.page === 1
        ? {
            fees: Yup.object().shape({
              performanceFee: Yup.number()
                .typeError('Performance fee is required')
                .required('Performance fee is required')
                .min(0, 'Fee must be positive')
                .max(100, 'Fee can not be greater than 100'),
              managementFee: Yup.number()
                .typeError('Management fee is required')
                .required('Management fee is required')
                .min(0, 'Fee must be positive')
                .max(100, 'Fee can not be greater than 100'),
              feePeriod: Yup.number()
                .typeError('Fee period is required')
                .required('Fee period is required')
                .min(0, 'Fee must be positive'),
            }),
          }
        : {}),

      ...(props.page === 2
        ? {
            policies: Yup.object().shape({
              priceTolerance: Yup.number()
                .typeError('Price tolerance fee is required')
                .positive('Fee must be positive')
                .max(100, 'Fee can not be greater than 100')
                .integer('Fee must be an integer'),
              maxPositions: Yup.number()
                .typeError('Price tolerance fee is required')
                .positive('Fee must be positive')
                .integer('Fee must be an integer'),
              maxConcentration: Yup.number()
                .typeError('Price tolerance fee is required')
                .positive('Fee must be positive')
                .max(100, 'Fee can not be greater than 100')
                .integer('Fee must be an integer'),
            }),
          }
        : {}),

      ...(props.page === 3
        ? {
            terms: Yup.boolean().test(
              'is-checked',
              'Must Accept Terms and Conditions',
              value => (value !== true ? false : true),
            ),
          }
        : {}),
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
        [value]: availablePolicies()[value].defaultValue,
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
    const fields = R.path([props.page, 'validateFields'], props.steps);

    if (fields) {
      await fields.map(item => props.setFieldTouched(item, true, true));
      await props.validateForm().then(errors => {
        if (!R.isEmpty(errors)) {
          return props.setPage(props.page);
        }
        return props.setPage(props.page + 1);
      });
    } else {
      return props.setPage(props.page + 1);
    }
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
