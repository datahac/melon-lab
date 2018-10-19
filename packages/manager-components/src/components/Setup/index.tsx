import React, { StatelessComponent, Fragment } from 'react';
import Spinner from '~/blocks/Spinner';
import Link from '~/blocks/Link';

import styles from './styles.css';
import Notification from '../../blocks/Notification/index';

export interface SetupProps {
  loading?: boolean;
  network?: string;
  balances: {
    eth?: string;
    mln?: string;
  };
  address: string;
  fees?: any;
  FeeFormModal;
  FeeFormModalProps;
  PolicyModal;
  PolicyModalProps;
  SetupForm;
  SetupFormProps;
}

export const Setup: StatelessComponent<SetupProps> = ({
  loading,
  balances,
  address,
  FeeFormModal,
  FeeFormModalProps = {},
  PolicyModal,
  PolicyModalProps = {},
  SetupForm,
  SetupFormProps = {},
}) => {
  return (
    <div className="setup">
      <style jsx>{styles}</style>

      {FeeFormModal && <FeeFormModal {...FeeFormModalProps} />}

      {PolicyModal && <PolicyModal {...PolicyModalProps} />}

      {loading ? (
        <Spinner
          icon
          size="small"
          text="Deploying your fund to the Ethereum blockchain..."
        />
      ) : (
        <Fragment>
          {balances && balances.eth === '0' ? (
            <Notification isWarning>
              <b>Insufficient ETH Balance</b>
              <p>
                You don't have enough Kovan Ether or Kovan W-ETH. Current
                balances: {balances.eth} ETH
                <br />
                To get started, head to our faucet to receive Kovan Ether and
                Kovan Melon
                <br />
                Once you have received ETH-T and MLN-T, go ahead and create your
                Melon fund.
              </p>

              <Link
                target="_blank"
                style="secondary"
                size="medium"
                href={`https://faucet.melon.fund/?address=${address}`}
              >
                Go to faucet
              </Link>
            </Notification>
          ) : (
            <Fragment>
              {SetupForm && <SetupForm {...SetupFormProps} />}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Setup;
