import React, { useState } from 'react';
import Modal from '~/blocks/Modal';
import Button from '~/blocks/Button';
import Notification from '~/blocks/Notification';

const WarningModal = ({ text, isOpen = false, handleSubmit }) => {
  return (
    <Modal
      title="Warning"
      isOpen={isOpen}
      PrimaryAction={Button}
      PrimaryActionProps={{
        children: 'Ok',
        style: 'primary',
        onClick: handleSubmit,
      }}
    >
      <Notification isWarning>{text}</Notification>
    </Modal>
  );
};

export default WarningModal;
