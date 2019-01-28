import classNames from 'classnames';
import React, { StatelessComponent, Fragment } from 'react';
import Logos from '~/design/Logos';
import Link from '~/link';
import * as Tm from '@melonproject/token-math';

import styles from './styles.css';

export const statusTypes = {
  NEUTRAL: 'NEUTRAL',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  GOOD: 'GOOD',
};

// @TODO: Provide networks as prop.
const networks = {};

export const getStatus = (
  canonicalPriceFeedAddress,
  network,
  currentBlock,
  blockOverdue,
  nodeSynced,
  priceFeedUp,
  canInteract,
  canInvest,
) => {
  if (!currentBlock) {
    return {
      message: 'Not ready',
      type: statusTypes.WARNING,
    };
  }

  if (blockOverdue) {
    return {
      message: 'Block overdue',
      type: statusTypes.WARNING,
    };
  }

  if (!nodeSynced) {
    return {
      message: 'Node not synced',
      type: statusTypes.WARNING,
    };
  }

  if (!priceFeedUp) {
    const prefix = network === networks.KOVAN ? 'kovan.' : '';
    const suffix = canonicalPriceFeedAddress;

    return {
      message: 'Price feed down',
      type: statusTypes.ERROR,
      link: `https://${prefix}etherscan.io/address/${suffix}`,
    };
  }

  if (!canInteract) {
    return {
      message: 'Insufficent ETH',
      type: statusTypes.WARNING,
    };
  }

  if (!canInvest) {
    return {
      message: 'Insufficent MLN',
      type: statusTypes.WARNING,
    };
  }

  return {
    message: 'Melon Node',
    type: statusTypes.NEUTRAL,
  };
};

export interface HeaderProps {
  address?: string;
  ethBalance: Tm.QuantityInterface;
  canonicalPriceFeedAddress: string;
  network: string;
  currentBlock: string;
  blockOverdue: boolean;
  nodeSynced: boolean;
  priceFeedUp: boolean;
  canInteract: boolean;
  canInvest: boolean;
  fundName?: string;
}

export const Header: StatelessComponent<HeaderProps> = ({
  address,
  network,
  ethBalance,
  canonicalPriceFeedAddress,
  currentBlock,
  blockOverdue,
  nodeSynced,
  priceFeedUp,
  canInteract,
  canInvest,
  fundName,
}) => {
  const message = getStatus(
    canonicalPriceFeedAddress,
    network,
    currentBlock,
    blockOverdue,
    nodeSynced,
    priceFeedUp,
    canInteract,
    canInvest,
  );

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
              <Logos width={115} height={30} name="with-text" />
            </span>
            <span className="header__logo-small">
              <Logos width={30} height={30} name="default" />
            </span>
          </a>
        </Link>
      </div>
      <div className="header__account">
        <div className="header__account-name">{fundName}</div>
        <div className="header__account-info">
          <span className="header__account-address">
            <Link href="/wallet">
              <a href="/wallet" title={address}>
                Your Wallet
              </a>
            </Link>
          </span>
          {ethBalance && (
            <span className="header__account-balances">
              <span className="header__account-balance">
                ETH {Tm.toFixed(ethBalance)}
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
                <Fragment>{message.message}</Fragment>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
