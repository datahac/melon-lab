import { withFormik } from 'formik';

const validate = (values, props) => {
  return {};
};

const withForm = withFormik({
  validate,
  enableReinitialize: true,
  handleSubmit: (values, form) => {
    form.props.setAllowedAssets(values.allowedAssets.map(item => item.value));
  },
  mapPropsToValues: props => ({
    allowedAssets: props.allowedAssets.map(item => ({
      label: item.symbol,
      value: item.address,
    })),
  }),
});

export default withForm;
