import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Notification from '~/blocks/Notification';
import Link from '~/blocks/Link';
import Spinner from '~/blocks/Spinner';
import displayNumber from '~/utils/displayNumber';

import styles from './styles.css';

export interface WalletProps {
  associatedFund?: {
    address: string;
    name: string;
  };
  currentAddress?: string;
  deleteWallet: () => void;
  isCompetition?: boolean;
  networkId: string;
  hasAccount?: boolean;
  hasWallet?: boolean;
  loading?: boolean;
  balances?: {
    eth?: string;
    mln?: string;
    weth?: string;
  };
}

export const Wallet: StatelessComponent<WalletProps> = ({
  associatedFund,
  currentAddress,
  deleteWallet,
  isCompetition,
  networkId,
  hasAccount,
  hasWallet,
  loading,
  balances,
}) => {
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
              <div className="wallet__info">
                <p>
                  Your ethereum address. Use this for white listing on{' '}
                  <a href="https://ico.bitcoinsuisse.ch/" target="_blank">
                    ico.bitcoinsuisse.ch
                  </a>
                  :<br />
                  <code>
                    <a
                      href={`https://${
                        networkId === 'KOVAN' ? 'kovan.' : ''
                      }etherscan.io/address/${currentAddress}`}
                      target="_blank"
                    >
                      <span className="wallet__info-value">
                        {currentAddress}
                      </span>
                    </a>
                  </code>
                </p>
                <p>
                  ETH:
                  <br />
                  <code>
                    <span className="wallet__info-value">
                      {balances &&
                        displayNumber(balances.eth ? balances.eth : 0)}
                    </span>
                  </code>
                </p>
                <p>
                  MLN:
                  <br />
                  <code>
                    <span className="wallet__info-value">
                      {balances &&
                        displayNumber(balances.mln ? balances.mln : 0)}
                    </span>
                  </code>
                </p>
                <p>
                  WETH:
                  <br />
                  <code>
                    <span className="wallet__info-value">
                      {balances &&
                        displayNumber(balances.weth ? balances.weth : 0)}
                    </span>
                  </code>
                </p>
              </div>
              {associatedFund ? (
                <Fragment>
                  <h2>Your fund</h2>
                  <Link
                    style="primary"
                    size="medium"
                    href={{
                      pathname: '/manage',
                      query: { address: associatedFund.address },
                    }}
                  >
                    {associatedFund.name}
                  </Link>
                  <p>
                    Fund address:{' '}
                    <strong>
                      <a
                        href={`https://${
                          networkId === 'KOVAN' ? 'kovan.' : ''
                        }etherscan.io/address/${associatedFund.address}`}
                        target="_blank"
                      >
                        {associatedFund.address}
                      </a>
                    </strong>
                  </p>
                </Fragment>
              ) : (
                <p>
                  <Link style="primary" size="medium" href="/setup">
                    Setup your fund
                  </Link>
                </p>
              )}

              <hr />

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

          <Fragment>
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
        </Fragment>
      )}
    </div>
  );
};

export default Wallet;
