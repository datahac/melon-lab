import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface TransactionProgressProps {
  activeTransaction: string;
  transactions: Array<{
    name: string;
    isComplete: boolean;
  }>;
}

export const TransactionProgress: StatelessComponent<
  TransactionProgressProps
> = ({ transactions, activeTransaction }) => {
  const itemClassNames = (isComplete, isActive) =>
    classNames('transaction-progress__item', {
      'transaction-progress__item--is-complete': isComplete,
      'transaction-progress__item--is-active': isActive,
    });

  return (
    <div className="transaction-progress">
      <style jsx>{styles}</style>
      {transactions.map((transaction, index) => (
        <div
          className={itemClassNames(
            transaction.isComplete,
            transaction.name === activeTransaction,
          )}
          key={index}
        >
          <div className="transaction-progress__name">{transaction.name}</div>
          <div className="transaction-progress__status">
            {(transaction.isComplete ||
              transaction.name === activeTransaction) && (
              <div className="transaction-progress__checkmark" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionProgress;
