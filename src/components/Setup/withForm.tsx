import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withHandlers, compose } from 'recompose';
import gql from 'graphql-tag';
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
  terms: false,
  gasPrice: '5',
  policies: [],
  performanceFee: '',
  managementFee: '',
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
            const { data } =
              value &&
              (await props.client.query({
                query: uniqueFundQuery,
                variables: {
                  name: value,
                },
              }));

            return !data.fundByName;
          },
        ),
      exchanges: Yup.array().required('Exchanges are required.'),
      terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
      gasPrice: Yup.number()
        .required('Gas price is required.')
        .moreThan(0, 'Please enter a valid gas price'),
    }),
  enableReinitialize: true,
  handleSubmit: (values, form) => {
    form.props.executeSetup({
      variables: {
        name: values.name,
        exchanges: values.exchanges,
        gasPrice: values.gasPrice,
        gasLimit: form.props.gasLimit,
      },
    });
  },
});

const withFormHandlers = withHandlers({
  onActivatePolicy: props => value => {
    const { policies } = props.values;

    if (!R.find(R.propEq('key', value.key), policies)) {
      props.setFieldValue('policies', [...policies, value]);
    } else {
      props.setFieldValue('policies', [
        ...policies.filter(item => item.key !== value.key),
      ]);
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
  onClickNext: props => e => {
    const fields = props.steps[props.page].validateFields;
    if (typeof fields !== 'undefined' && fields) {
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
  onClickPrev: props => event => {
    return props.setPage(props.page - 1);
  },
});

export default compose(
  withForm,
  withFormHandlers,
);
