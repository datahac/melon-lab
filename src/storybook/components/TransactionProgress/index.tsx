import classNames from 'classnames';
import React, { StatelessComponent, Fragment } from 'react';

import styles from './styles.css';

export interface TransactionProgressProps {
  activeTransaction: string;
  transactions: Array<{
    name: string;
    isComplete: boolean;
  }>;
}

export const TransactionProgress: StatelessComponent<TransactionProgressProps> = ({
  transactions,
  activeTransaction,
}) => {
  const itemClassNames = (isComplete, isActive) =>
    classNames('transaction-progress__item', {
      'transaction-progress__item--is-complete': isComplete,
      'transaction-progress__item--is-active': isActive,
    });

  return (
    <div className="transaction-progress">
      <style jsx>{styles}</style>

      <div className="transaction-progress__active-item">{activeTransaction}</div>

      {transactions.length > 1 && (
        <div className="transaction-progress__bar">
          {transactions.map((transaction, index) => (
            <div
              className={itemClassNames(transaction.isComplete, transaction.name === activeTransaction)}
              key={index}
              title={transaction.name}
            >
              <div className="transaction-progress__status">
                {(transaction.isComplete || transaction.name === activeTransaction) && (
                  <div className="transaction-progress__checkmark" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionProgress;
