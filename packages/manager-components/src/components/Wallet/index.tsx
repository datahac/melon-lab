import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Notification from '~/blocks/Notification';
import Link from '~/blocks/Link';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface WalletSettingsProps {
  currentAddress?: string;
  deleteWallet: () => void;
  isCompetition?: boolean;
  hasAccount?: boolean;
  hasWallet?: boolean;
  loading?: boolean;
}

export const WalletSettings: StatelessComponent<WalletSettingsProps> = ({
  currentAddress,
  deleteWallet,
  isCompetition,
  hasAccount,
  hasWallet,
  loading,
}) => {
  console.log();
  const isDanger = currentAddress ? 'danger' : 'primary';

  return (
    <div className="wallet">
      <style jsx>{styles}</style>
      {loading ? (
        <Spinner icon size="small" />
      ) : (
        <Fragment>
          {currentAddress && (
            <Fragment>
              <h2>Settings</h2>
              <p>
                <strong>
                  It is highly recommended to download a backup of your wallet.
                  You can import this into{' '}
                  <a href="https://mycrypto.com/" target="_blank">
                    MyCrypto.com
                  </a>{' '}
                  or Parity.
                </strong>
              </p>
              <p>
                <Link style="secondary" size="medium" href="/wallet/download">
                  Download wallet backup JSON
                </Link>
              </p>
              <hr />
              {!isCompetition && (
                <Fragment>
                  <p>
                    <strong> [IMPORTANT] - Please read carefully</strong>{' '}
                  </p>
                  <p>
                    Careful, below actions have <strong> irreversible</strong>{' '}
                    effects. If you do not have a backup of the mnemonic phrase
                    that generated your current address,
                    <strong>
                      {' '}
                      you will never be able to access your current wallet again{' '}
                    </strong>{' '}
                    after performing one of the below actions.
                  </p>
                </Fragment>
              )}
            </Fragment>
          )}

          {!hasAccount &&
            hasWallet && (
              <Fragment>
                <Notification isWarning>
                  <p>
                    We found a Wallet on your Computer. You can load it here:
                  </p>
                  <Link style="secondary" size="medium" href="/wallet/load">
                    Load Wallet
                  </Link>
                </Notification>

                <hr />
              </Fragment>
            )}

          {!isCompetition && (
            <p>
              <Link style={isDanger} size="medium" href="/wallet/generate">
                Create a new wallet
              </Link>
            </p>
          )}
          <p>
            <Link style={isDanger} size="medium" href="/wallet/restore">
              Restore from mnemonic
            </Link>
          </p>
          <p>
            <Link style={isDanger} size="medium" href="/wallet/import">
              Import wallet JSON
            </Link>
          </p>
          {currentAddress &&
            !isCompetition && (
              <p>
                <Button style={isDanger} onClick={deleteWallet}>
                  Delete wallet
                </Button>
              </p>
            )}
        </Fragment>
      )}
    </div>
  );
};

export default WalletSettings;
