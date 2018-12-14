import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withHandlers, compose } from 'recompose';
import { divide, multiply } from '@melonproject/token-math/bigInteger';

const withForm = withFormik({
  mapPropsToValues: () => ({
    price: 1,
    total: 0,
    quantity: 0,
    type: 'Invest',
  }),
  validationSchema: props => {
    const numberFormat = (0).toFixed(4);
    const minNumber = numberFormat.slice(0, -1) + '1';

    return Yup.object().shape({
      total: Yup.number()
        .min(minNumber, `Minimum total is ${minNumber}`)
        .required('Total is required.'),
      quantity: Yup.number()
        .min(minNumber, `Minimum quantity is ${minNumber}`)
        .required('Quantity is required.'),
      price: Yup.number()
        .min(minNumber, `Minimum price is ${minNumber}`)
        .required('Price is required.'),
    });
  },
  enableReinitialize: true,
  handleSubmit: (values, form) => form.props.setInvestValues(values),
});

const withFormHandlers = compose(
  withHandlers({
    handleChange: props => event => {
      const { name, value } = event.target;
      const { values } = props;

      const totalValue = name === 'total' ? value : values.total;
      const quantityValue = name === 'quantity' ? value : values.quantity;
      const priceValue = name === 'price' ? value : values.price;

      props.setFieldValue(name, value);

      if (name === 'quantity' || name === 'price') {
        const total = multiply(quantityValue, priceValue);

        if (values.total !== total) {
          props.setFieldValue('total', total.toString());
        }
      } else if (name === 'total' || name === 'price') {
        const quantity = divide(totalValue, priceValue);

        if (values.quantity !== quantity) {
          props.setFieldValue('quantity', quantity.toString());
        }
      }
    },
  }),
);

export default compose(
  withForm,
  withFormHandlers,
);
