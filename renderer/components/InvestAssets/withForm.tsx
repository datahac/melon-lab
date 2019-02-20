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
  mapPropsToValues: props => {
    return {
      allowedAssets: props.allowedAssets,
    };
  },
});

export default withForm;
