import React from 'react';
import Modal from '~/blocks/Modal';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import FeeForm from '~/components/FeeForm';

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
      onClick: onClickDecline,
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

export default FeeFormModal;
