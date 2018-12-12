import React, { Fragment, StatelessComponent } from 'react';
import Link from '~/blocks/Link';
import Spinner from '~/blocks/Spinner';
import InsufficientFunds from '~/components/InsufficientFunds';
import { isZero } from '~/utils/functionalBigNumber';
import { toFixed } from '@melonproject/token-math/quantity';

import styles from './styles.css';

export interface WalletOverviewProps {
  associatedFund?: string;
  currentAddress?: string;
  networkId: string;
  loading?: boolean;
  step?: number;
  balances?: {
    eth?: string;
    mln?: string;
    weth?: string;
  };
}

export const WalletOverview: StatelessComponent<WalletOverviewProps> = ({
  associatedFund,
  currentAddress,
  networkId,
  loading,
  balances,
  step,
}) => (
  <div className="wallet-overview">
    <style jsx>{styles}</style>
    {loading ? (
      <Spinner icon size="small" />
    ) : (
      <Fragment>
        {currentAddress && (
          <Fragment>
            <h2>Balances</h2>
            <div className="wallet-overview__balances">
              <div className="wallet-overview__balance">
                ETH:
                <br />
                <span className="wallet-overview__balance-value">
                  {balances && balances.eth && toFixed(balances.eth)}
                </span>
              </div>
              <div className="wallet-overview__balance">
                MLN:
                <br />
                <span className="wallet-overview__balance-value">
                  {balances && balances.mln && toFixed(balances.mln)}
                </span>
              </div>
              <div className="wallet-overview__balance">
                WETH:
                <br />
                <span className="wallet-overview__balance-value">
                  {balances && balances.weth && toFixed(balances.weth)}
                </span>
              </div>
            </div>
            <h2>Fund</h2>

            {associatedFund && (step && step >= 3) && (
              <AssociatedFund
                associatedFund={associatedFund}
                networkId={networkId}
              />
            )}

            {associatedFund && (step && step < 3) && (
              <Fragment>
                {balances && (!balances.eth || isZero(balances.eth)) ? (
                  <InsufficientFunds
                    eth={balances.eth}
                    weth={balances.weth}
                    address={currentAddress}
                  />
                ) : (
                  <Fragment>
                    <Link style="primary" size="medium" href="/setup">
                      Continue setup your fund
                    </Link>
                    <p>
                      Fund address:{' '}
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
                  </Fragment>
                )}
              </Fragment>
            )}

            {!associatedFund && (
              <Fragment>
                {balances && (!balances.eth || isZero(balances.eth)) ? (
                  <InsufficientFunds
                    eth={balances.eth}
                    weth={balances.weth}
                    address={currentAddress}
                  />
                ) : (
                  <Link style="primary" size="medium" href="/setup">
                    Setup your fund
                  </Link>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    )}
  </div>
);

const AssociatedFund = ({ associatedFund, networkId }) => (
  <Fragment>
    <Link
      style="primary"
      size="medium"
      href={{
        pathname: '/manage',
        query: { address: associatedFund },
      }}
    >
      Go to your fund
    </Link>
    <p>
      Fund address:{' '}
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
  </Fragment>
);

export default WalletOverview;
