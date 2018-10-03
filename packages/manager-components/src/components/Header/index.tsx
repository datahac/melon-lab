import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import Icon from '~/blocks/Icon';
import Link from '~/link';
import displayNumber from '~/utils/displayNumber';

import styles from './styles.css';

export interface HeaderProps {
  address?: string;
  balances: {
    eth: number;
  };
  network?: string;
  message?: {
    message?: string;
    link?: string;
    type?: string;
  };
}

export const Header: StatelessComponent<HeaderProps> = ({
  address,
  balances,
  network,
  message,
}) => {
  const statusClassName = classNames('header__account-status', {
    'header__account-status--warning': message && message.type === 'WARNING',
    'header__account-status--error': message && message.type === 'ERROR',
  });

  return (
    <div className="header">
      <style jsx>{styles}</style>
      <div className="header__logo">
        <Link href="/">
          <a href="/">
            <span className="header__logo-default">
              <Icon width="115px" height="30px" name="logos_with-text" />
            </span>
            <span className="header__logo-small">
              <Icon width="30px" height="30px" name="logos_default" />
            </span>
          </a>
        </Link>
      </div>
      <div className="header__account">
        <div className="header__account-name">{''}</div>
        <div className="header__account-info">
          <span className="header__account-address">
            <Link href="/wallet">
              <a href="/wallet">Your Wallet</a>
            </Link>
          </span>
          {balances &&
            balances.eth && (
              <span className="header__account-balances">
                <span className="header__account-balance">
                  ETH {displayNumber(balances.eth)}
                </span>
              </span>
            )}
          {network && (
            <span className="header__account-network">{network}</span>
          )}
          {message && (
            <span className={statusClassName}>
              {message.link ? (
                <Link href={message.link}>
                  <a href={message.link} target="_blank">
                    {message.message}
                  </a>
                </Link>
              ) : (
                <React.Fragment>{message.message}</React.Fragment>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
