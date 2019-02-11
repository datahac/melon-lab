import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Link from '~/blocks/Link';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface WalletSettingsProps {
  hasWallet: boolean;
  isHardwareWallet: boolean;
  currentAddress?: string;
  deleteWallet: () => void;
  isCompetition?: boolean;
  loading?: boolean;
  ethAccounts?: string[];
  checkFrameAccounts: () => void;
  useFrameAccount: (account) => void;
}

export const WalletSettings: StatelessComponent<WalletSettingsProps> = ({
  currentAddress,
  deleteWallet,
  hasWallet,
  isHardwareWallet,
  isCompetition,
  loading,
  ethAccounts = [],
  useFrameAccount,
}) => {
  const isDanger = currentAddress && !isHardwareWallet ? 'danger' : 'primary';
  const showFrameButton =
    (!currentAddress && ethAccounts.length > 0) ||
    (currentAddress &&
      ethAccounts.length > 0 &&
      ethAccounts[0].toLowerCase() !== currentAddress.toLowerCase());

  return (
    <div className="wallet">
      <style jsx={true}>{styles}</style>
      {loading ? (
        <Spinner icon={true} size="small" />
      ) : (
        <Fragment>
          {currentAddress && !isHardwareWallet && (
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
              <div className="wallet__link">
                <Link style="secondary" size="medium" href="/wallet/download">
                  Download wallet backup JSON
                </Link>
              </div>
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

          {isHardwareWallet && (
            <p>You are using a hardware wallet through Frame.</p>
          )}

          {showFrameButton && (
            <div className="wallet__button">
              <Link
                style={isDanger}
                size="medium"
                onClick={() => useFrameAccount(ethAccounts[0])}
              >
                Use {ethAccounts[0]} from Frame
              </Link>
            </div>
          )}

          {ethAccounts && ethAccounts.length === 0 && (
            <div className="wallet__button">
              No accounts found from Frame.{' '}
              <a href="https://frame.sh/" target="_blank">
                Download Frame here.
              </a>{' '}
              Follow the instructions and come back here.
            </div>
          )}

          {hasWallet && (
            <div className="wallet__button">
              <Link style={isDanger} size="medium" href="/wallet/load">
                Log in to existing wallet
              </Link>
            </div>
          )}
          {!isCompetition && (
            <div className="wallet__button">
              <Link style={isDanger} size="medium" href="/wallet/generate">
                Create a new wallet
              </Link>
            </div>
          )}
          <div className="wallet__button">
            <Link style={isDanger} size="medium" href="/wallet/restore">
              Restore from mnemonic
            </Link>
          </div>
          <div className="wallet__button">
            <Link style={isDanger} size="medium" href="/wallet/import">
              Import wallet JSON
            </Link>
          </div>
          {currentAddress && !isCompetition && (
            <div className="wallet__button">
              <Button style={isDanger} onClick={deleteWallet}>
                Delete wallet
              </Button>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default WalletSettings;
