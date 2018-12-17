import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withHandlers, compose } from 'recompose';
import {
  divide,
  multiply,
  toString,
} from '@melonproject/token-math/bigInteger';
import { createQuantity, isEqual } from '@melonproject/token-math/quantity';
import { valueIn } from '@melonproject/token-math/price';

const withForm = withFormik({
  mapPropsToValues: props => ({
    price: props.sharePrice,
    total: props.sharePrice && createQuantity(props.sharePrice.quote.token, 0),
    quantity:
      props.sharePrice && createQuantity(props.sharePrice.base.token, 0),
    type: 'Invest',
  }),
  // TODO: Implement validation
  // validationSchema: props => {
  //   const numberFormat = (0).toFixed(4);
  //   const minNumber = numberFormat.slice(0, -1) + '1';

  //   return Yup.object().shape({
  //     total: Yup.number()
  //       .min(minNumber, `Minimum total is ${minNumber}`)
  //       .required('Total is required.'),
  //     quantity: Yup.number()
  //       .min(minNumber, `Minimum quantity is ${minNumber}`)
  //       .required('Quantity is required.'),
  //     price: Yup.number()
  //       .min(minNumber, `Minimum price is ${minNumber}`)
  //       .required('Price is required.'),
  //   });
  // },
  enableReinitialize: true,
  handleSubmit: (values, form) => form.props.setInvestValues(values),
});

const withFormHandlers = compose(
  withHandlers({
    handleChange: props => event => {
      const { name, value } = event.target;
      const { values } = props;

      if (name === 'quantity') {
        const quantity = createQuantity(
          props.sharePrice.base.token,
          parseFloat(value) || 0,
        );
        props.setFieldValue('quantity', quantity);

        const total = valueIn(values.price, quantity);
        if (!isEqual(values.total, total)) {
          props.setFieldValue('total', total);
        }
      }

      if (name === 'total') {
        const total = createQuantity(
          props.sharePrice.quote.token,
          parseFloat(value) || 0,
        );
        props.setFieldValue('total', total);

        const quantity = valueIn(values.price, total);
        if (!isEqual(values.quantity, quantity)) {
          props.setFieldValue('quantity', quantity);
        }
      }
    },
  }),
);

export default compose(
  withForm,
  withFormHandlers,
);
