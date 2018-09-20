import React from 'react';
import ModalComponent from '@melonproject/manager-components/blocks/Modal';
import PasswordForm from '../../containers/PasswordForm';
import FeeForm from '../../containers/FeeForm';

export const types = {
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  CONFIRM: 'CONFIRM',
  PASSWORD: 'PASSWORD',
  INFO: 'INFO',
};

const Modal = ({
  isOpen,
  type,
  title,
  body,
  fees,
  method,
  primaryInteraction,
  secondaryInteraction,
  interactionHandler,
  handleSubmit,
  onAfterOpen,
}) => {
  return (
    <ModalComponent
      isOpen={isOpen}
      title={title}
      body={body}
      primaryInteraction={primaryInteraction}
      secondaryInteraction={secondaryInteraction}
      interactionHandler={interactionHandler}
      handleSubmit={handleSubmit}
      onAfterOpen={onAfterOpen}
      loading={type === types.LOADING}
      error={type === types.ERROR}
    >
      {method &&
        type !== types.ERROR && (
          <div>
            <p>
              The following method on the Melon Smart Contracts will be
              executed:
            </p>
            <p>
              <b>{method}</b>
            </p>
          </div>
        )}

      {fees && <FeeForm fees={fees} />}
      {type === types.PASSWORD && <PasswordForm />}
    </ModalComponent>
  );
};

export default Modal;
