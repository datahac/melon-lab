import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface NotificationProps {
  isClosable?: boolean;
  isError?: boolean;
  isInline?: boolean;
  isWarning?: boolean;
}

const Notification: StatelessComponent<NotificationProps> = ({
  children,
  isClosable,
  isError,
  isInline,
  isWarning,
}) => {
  const notificationClassNames = classNames('notification', {
    'notification--inline': isInline,
    'notification--warning': isWarning,
    'notification--error': isError,
    'notification--is-closable': isClosable,
  });

  return (
    <div className={notificationClassNames}>
      <style jsx>{styles}</style>
      {children}
      {isClosable && <button className="notification__close">&times;</button>}
    </div>
  );
};

export default Notification;
