import React from 'react';
import Modal from '~/blocks/Modal';
import Button from '~/blocks/Button';
import TermsConditions from '~/components/TermsConditions';

const TermsConditionsModal = ({ onClickDecline, signed, setSigned }) => (
  <Modal
    title="Terms and Conditions"
    isOpen={!signed}
    PrimaryAction={Button}
    PrimaryActionProps={{
      children: 'Decline',
      style: 'secondary',
      onClick: onClickDecline,
    }}
    SecondaryAction={Button}
    SecondaryActionProps={{
      children: 'Accept',
      onClick: setSigned,
    }}
  >
    <TermsConditions />
  </Modal>
);

export default TermsConditionsModal;
