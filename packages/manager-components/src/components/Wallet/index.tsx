import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Notification from '~/blocks/Notification';
import StyledLink from '~/blocks/Link';
import Spinner from '~/blocks/Spinner';
import Link from '~/link';
import displayNumber from '~/utils/displayNumber';

import styles from './styles.css';

export interface WalletProps {
  associatedFund?: string;
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
  const isDanger = currentAddress ? 'danger' : 'secondary';

  return (
    <div className="wallet">
      <style jsx>{styles}</style>
      <h3>Your Wallet</h3>
      {loading ? (
        <Spinner icon size="small" />
      ) : (
        <Fragment>
          {currentAddress ? (
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
              </div>
              <hr />
              {associatedFund && (
                <p>
                  Associated fund address:{' '}
                  <strong>
                    <a
                      href={`https://${
                        networkId === 'KOVAN' ? 'kovan.' : ''
                      }etherscan.io/address/${associatedFund}`}
                      target="_blank"
                    >
                      {associatedFund}
                    </a>
                  </strong>
                </p>
              )}

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
                <Link href="/wallet/download" passHref>
                  <StyledLink style="secondary" size="medium">
                    Download wallet backup JSON
                  </StyledLink>
                </Link>
              </p>
              {!associatedFund ? (
                <p>
                  <Link href="/setup" passHref>
                    <StyledLink style="primary" size="medium" passHref>
                      Setup your fund
                    </StyledLink>
                  </Link>
                </p>
              ) : (
                <p>
                  <Link
                    href={{
                      pathname: '/manage',
                      query: { address: associatedFund },
                    }}
                  >
                    <StyledLink style="secondary" size="medium" passHref>
                      Go to your fund
                    </StyledLink>
                  </Link>
                </p>
              )}
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
          ) : (
            <Fragment>
              <p>
                Before you can setup your fund, you need to import, restore or
                create a wallet:
              </p>
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
                    <Link href="/wallet/load" passHref>
                      <StyledLink style="secondary" size="medium">
                        Load Wallet
                      </StyledLink>
                    </Link>
                  </Notification>

                  <hr />
                </Fragment>
              )}

            {!isCompetition && (
              <p>
                <Link href="/wallet/generate" passHref>
                  <StyledLink style="secondary" size="medium">
                    Create a new wallet
                  </StyledLink>
                </Link>
              </p>
            )}
            <p>
              <Link href="/wallet/restore" passHref>
                <StyledLink style="secondary" size="medium">
                  Restore from mnemonic
                </StyledLink>
              </Link>
            </p>
            <p>
              <Link href="/wallet/import" passHref>
                <StyledLink style="secondary" size="medium">
                  Import wallet JSON
                </StyledLink>
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