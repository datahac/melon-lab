import React from 'react';
import Modal from '~/blocks/Modal';
import Button from '~/blocks/Button';
import TermsConditions from '~/components/TermsConditions';

const TermsConditionsModal = ({ onClickDecline, onClickConfirm, showModal }) => (
  <Modal
    title="Terms and Conditions"
    isOpen={showModal}
    PrimaryAction={Button}
    PrimaryActionProps={{
      children: 'Decline',
      style: 'secondary',
      onClick: onClickDecline,
    }}
    SecondaryAction={Button}
    SecondaryActionProps={{
      children: 'Accept',
      onClick: onClickConfirm,
    }}
  >
    <TermsConditions />
  </Modal>
);

export default TermsConditionsModal;
