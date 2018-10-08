import { withFormik } from 'formik';
import { compose, withState } from 'recompose';
import * as Yup from 'yup';
import React from 'react';
import Modal from '~/blocks/Modal';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import FeeForm from '~/components/FeeForm';

const withModalState = withState('showModal', 'setShowModal', false);

const initialValues = {
  gasPrice: '',
};

const withFormValidation = withFormik({
  mapPropsToValues: props =>
    props.formValues ? { ...props.formValues } : initialValues,
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    gasPrice: Yup.number()
      .required('Gas price is required.')
      .moreThan(0, 'Please enter a valid  gas price'),
  }),
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

const FeeFormModal = ({
  onClickDecline,
  onClickConfirm,
  fees,
  handleSubmit,
  setShowModal,
  showModal,
  ...props
}) => (
  <Modal
    title="Fees"
    isOpen={showModal}
    PrimaryAction={Button}
    PrimaryActionProps={{
      children: 'Cancel',
      style: 'secondary',
      onClick: () => setShowModal(false),
    }}
    SecondaryAction={Button}
    SecondaryActionProps={{
      children: 'Confirm',
      onClick: onClickConfirm,
    }}
    ContentWrapper={Form}
    ContentWrapperProps={{
      onSubmit: handleSubmit,
    }}
  >
    <FeeForm fees={fees} {...props} />
  </Modal>
);

export default compose(
  withFormValidation,
  withModalState,
)(FeeFormModal);
