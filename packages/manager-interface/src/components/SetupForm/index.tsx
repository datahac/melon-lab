import { compose, withState } from 'recompose';
import Setup from '~/components/Setup';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import ExchangeSelectorModal from '+/components/ExchangeSelectorModal';

const withPolicyModalState = withState(
  'showPolicyModal',
  'setShowPolicyModal',
  false,
);

const initialValues = {
  name: '',
  exchanges: [],
};

const withFormValidation = withFormik({
  mapPropsToValues: () => initialValues,
  validationSchema: Yup.object().shape({
    name: Yup.string().required('name is required.'),
    exchanges: Yup.array().required('exchanges are required.'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

const SetupWithModals = props => {
  let PolicyModal;

  if (props.showPolicyModal === 'exchangeSelector') {
    PolicyModal = {
      PolicyModal: ExchangeSelectorModal,
      PolicyModalProps: {
        availableExchanges: props.availableExchanges,
        selectedExchanges: props.values.exchanges,
        isOpen: !!props.showPolicyModal,
        setIsOpen: props.setShowPolicyModal,
        setFieldValue: props.setFieldValue,
      },
    };
  }

  return <Setup {...props} {...PolicyModal} />;
};

export default compose(
  withFormValidation,
  withPolicyModalState,
)(SetupWithModals);
