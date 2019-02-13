import React, { useState, useEffect } from 'react';
import Modal from '~/blocks/Modal';
import Button from '~/blocks/Button';
import Notification from '~/blocks/Notification';

const ErrorModal = ({ error }) => {
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  return (
    <Modal
      title="Error"
      isOpen={showErrorModal}
      PrimaryAction={Button}
      PrimaryActionProps={{
        children: 'Ok',
        style: 'primary',
        onClick: () => setShowErrorModal(false),
      }}
    >
      <Notification isError>{error && error.message}</Notification>
    </Modal>
  );
};

export default ErrorModal;
