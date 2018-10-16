import { compose, withHandlers, withState } from 'recompose';
import React from 'react';
import Modal from '~/blocks/Modal';
import Button from '~/blocks/Button';
import TermsConditions from '~/components/TermsConditions';
import Router from 'next/router';

const withModalState = withState('signed', 'setSigned', false);

const withTermsConditionsHandlers = withHandlers({
  onClickDecline: props => e => {
    Router.replace({
      pathname: '/wallet',
    });
  },
});

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
      onClick: () => setSigned(true),
    }}
  >
    <TermsConditions />
  </Modal>
);

export default compose(
  withModalState,
  withTermsConditionsHandlers,
)(TermsConditionsModal);
