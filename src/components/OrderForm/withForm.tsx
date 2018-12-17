import { withFormik } from 'formik';
import * as Yup from 'yup';
import {
  min,
  max,
  divide,
  multiply,
  greaterThan,
} from '@melonproject/token-math/bigInteger';
import { withHandlers, compose } from 'recompose';

const validation = props => {
  const numberFormat = (0).toFixed(props.decimals || 4);
  const minNumber = numberFormat.slice(0, -1) + '1';

  return Yup.object().shape({
    price: Yup.number()
      .min(minNumber, `Minimum price is ${minNumber}`)
      .required('Price is required.'),
    quantity: Yup.number()
      .min(minNumber, `Minimum quantity is ${minNumber}`)
      .required('Quantity is required.'),
    total: Yup.number()
      .min(minNumber, `Minimum total is ${minNumber}`)
      .required('Total is required.'),
  });
};

const initialValues = {
  price: '',
  type: 'sell',
  strategy: 'Market',
  quantity: '',
  total: '',
  exchange: '',
};

const withForm = withFormik({
  mapPropsToValues: props =>
    props.formValues ? { ...props.formValues } : initialValues,
  validationSchema: props => validation(props),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

const withFormHandlers = withHandlers({
  onChange: props => event => {
    const { setFieldValue, tokens, values } = props;
    const { name, value } = event.target;

    let maxTotal;
    let maxQuantity;

    const typeValue = name === 'type' ? value : values.orderType;
    const totalValue = name === 'total' ? value : values.total;
    const quantityValue = name === 'quantity' ? value : values.quantity;

    setFieldValue(name, value);

    if (values.strategy === 'Market') {
      maxTotal =
        typeValue === 'Buy'
          ? min(tokens.quoteToken.balance, totalValue)
          : totalValue;
      maxQuantity =
        typeValue === 'Sell'
          ? max(tokens.baseToken.balance, quantityValue)
          : quantityValue;
    } else if (values.strategy === 'Limit') {
      maxTotal = typeValue === 'Buy' ? tokens.quoteToken.balance : Infinity;
      maxQuantity = typeValue === 'Sell' ? tokens.baseToken.balance : Infinity;
    }

    if (name === 'total') {
      if (greaterThan(value, maxTotal)) {
        setFieldValue('total', maxTotal);
      } else if (values.price) {
        const quantity = divide(value, values.price).toString(10);
        if (values.quantity !== value) {
          setFieldValue('quantity', quantity);
        }
      }
    }

    if (name === 'quantity') {
      if (greaterThan(value, maxQuantity)) {
        setFieldValue('quantity', maxQuantity);
      } else if (values.price) {
        const total = multiply(value, values.price).toString(10);
        if (values.total !== value) {
          setFieldValue('total', total);
        }
      }
    }

    if (name === 'price' && values.quantity) {
      const total = multiply(values.quantity, value).toString(10);
      setFieldValue('total', total);
    }
  },
});

export default compose(
  withForm,
  withFormHandlers,
);
