import React, { StatelessComponent, Fragment } from 'react';
import ReactModal from 'react-modal';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface ModalProps {
  title?: string;
  text?: string;
  loading?: boolean;
  PrimaryAction;
  PrimaryActionProps;
  SecondaryAction;
  SecondaryActionProps;
  ContentWrapper;
  ContentWrapperProps;
}

const Modal: StatelessComponent<ModalProps> = ({
  PrimaryAction,
  PrimaryActionProps = {},
  SecondaryAction,
  SecondaryActionProps = {},
  ContentWrapper,
  ContentWrapperProps = {},
  children,
  title,
  text,
  loading,
  ...props
}) => (
  <ReactModal
    className="modal__wrap"
    overlayClassName="modal__overlay"
    ariaHideApp={false}
    {...props}
  >
    <style jsx>{styles}</style>
    <div className="modal__title">{title}</div>
    {loading ? (
      <div className="modal__spinner">
        <Spinner icon size="small" />
      </div>
    ) : (
      <div className="modal__content">
        {ContentWrapper ? (
          <ContentWrapper {...ContentWrapperProps}>
            {children}

            <div className="modal__actions">
              {PrimaryAction && (
                <div className="modal__action">
                  <PrimaryAction {...PrimaryActionProps} />
                </div>
              )}

              {SecondaryAction && (
                <div className="modal__action">
                  <SecondaryAction {...SecondaryActionProps} />
                </div>
              )}
            </div>
          </ContentWrapper>
        ) : (
          <Fragment>
            {children}

            <div className="modal__actions">
              {PrimaryAction && (
                <div className="modal__action">
                  <PrimaryAction {...PrimaryActionProps} />
                </div>
              )}

              {SecondaryAction && (
                <div className="modal__action">
                  <SecondaryAction {...SecondaryActionProps} />
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    )}
  </ReactModal>
);

export default Modal;
