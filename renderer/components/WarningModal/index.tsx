import React, { useState } from 'react';
import Modal from '~/blocks/Modal';
import Button from '~/blocks/Button';
import Notification from '~/blocks/Notification';

const WarningModal = ({ text, isOpen = false }) => {
  const [showWarningModal, setShowWarningModal] = useState(isOpen);

  return (
    <Modal
      title="Warning"
      isOpen={showWarningModal}
      PrimaryAction={Button}
      PrimaryActionProps={{
        children: 'Ok',
        style: 'primary',
        onClick: () => setShowWarningModal(false),
      }}
    >
      <Notification isWarning>{text}</Notification>
    </Modal>
  );
};

export default WarningModal;
