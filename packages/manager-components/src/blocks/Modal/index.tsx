import React, { StatelessComponent } from 'react';
import ReactModal from 'react-modal';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface ModalProps {
  body?: string;
  error?: boolean;
  handleSubmit?: () => void;
  interactionHandler?: () => void;
  isOpen?: boolean;
  loading?: boolean;
  onAfterOpen?: () => void;
  primaryInteraction?: string;
  secondaryInteraction?: string;
  title?: string;
}

const renderButtons = (
  primaryInteraction,
  secondaryInteraction,
  interactionHandler,
) => {
  const onClickPrimaryInteraction = event => {
    interactionHandler(event, primaryInteraction);
  };

  const onClickSecondaryInteraction = event => {
    interactionHandler(event, secondaryInteraction);
  };

  return secondaryInteraction ? (
    <div className="modal__actions">
      <div className="modal__action">
        <Button
          type="button"
          style="secondary"
          onClick={onClickSecondaryInteraction}
        >
          {secondaryInteraction}
        </Button>
      </div>
      <div className="modal__action">
        <Button type="submit" onClick={onClickPrimaryInteraction}>
          {primaryInteraction}
        </Button>
      </div>
    </div>
  ) : (
    primaryInteraction && (
      <Button type="submit" onClick={onClickPrimaryInteraction}>
        {primaryInteraction}
      </Button>
    )
  );
};

const Modal: StatelessComponent<ModalProps> = ({
  body,
  children,
  error,
  handleSubmit,
  interactionHandler,
  isOpen,
  loading,
  onAfterOpen,
  primaryInteraction,
  secondaryInteraction,
  title,
}) => (
  <ReactModal
    className="modal__wrap"
    overlayClassName="modal__overlay"
    onAfterOpen={onAfterOpen}
    isOpen={isOpen}
    ariaHideApp={false}
  >
    <style jsx>{styles}</style>
    <div className="modal__title">{title}</div>
    <div className="modal__content">
      <p>{body}</p>
      {children}

      {!loading ? (
        <Form onSubmit={handleSubmit}>
          {renderButtons(
            primaryInteraction,
            secondaryInteraction,
            interactionHandler,
          )}
        </Form>
      ) : (
        <div className="modal__spinner">
          <Spinner size="inflated" />
        </div>
      )}
    </div>
  </ReactModal>
);

export default Modal;
