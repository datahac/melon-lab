import * as Tm from '@melonproject/token-math';
import { withFormik } from 'formik';
import { withHandlers, compose } from 'recompose';
import { FormErrors } from '~/components/ParticipationForm';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const validate = values => {
  return sleep(0).then(async () => {
    const errors: FormErrors = {};

    if (!values.quantity) {
      errors.quantity = 'Required';
    } else if (Tm.isZero(values.quantity)) {
      errors.quantity = 'Invalid quantity';
    }

    if (Object.keys(errors).length) {
      throw errors;
    }
  });
};

const withForm = withFormik({
  mapPropsToValues: props => ({
    quantity: Tm.createQuantity(
      {
        symbol: 'WETH',
        decimals: 18,
      },
      0,
    ),
  }),
  validate,
  enableReinitialize: true,
  handleSubmit: (values, form) => form.props.setConvertValues(values),
});

const withFormHandlers = compose(
  withHandlers({
    handleChange: props => event => {
      const { name, value } = event.target;
      if (name === 'quantity') {
        const quantity = Tm.createQuantity(
          {
            symbol: 'WETH',
            decimals: 18,
          },
          parseFloat(value) || 0,
        );
        props.setFieldValue('quantity', quantity);
      }
    },
  }),
);

export default compose(
  withForm,
  withFormHandlers,
);
