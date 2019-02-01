import React, { Fragment, StatelessComponent } from 'react';
import Link from '~/blocks/Link';
import Spinner from '~/blocks/Spinner';
import InsufficientFunds from '~/components/InsufficientFunds';
import * as Tm from '@melonproject/token-math';

import styles from './styles.css';

export interface WalletOverviewProps {
  associatedFund?: string;
  currentAddress?: string;
  networkId: string;
  loading?: boolean;
  isComplete?: boolean;
  balances?: {
    eth?: Tm.QuantityInterface;
  };
}

export const WalletOverview: StatelessComponent<WalletOverviewProps> = ({
  associatedFund,
  currentAddress,
  networkId,
  loading,
  balances,
  isComplete,
}) => (
  <div className="wallet-overview">
    <style jsx>{styles}</style>
    {loading ? (
      <Spinner icon={true} size="small" />
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
                  {balances && balances.eth && Tm.toFixed(balances.eth)}
                </span>
              </div>
            </div>
            <h2>Fund</h2>

            {associatedFund && isComplete && (
              <AssociatedFund
                associatedFund={associatedFund}
                networkId={networkId}
              />
            )}

            {associatedFund && !isComplete && (
              <Fragment>
                {balances && !balances.eth ? (
                  <InsufficientFunds
                    eth={balances.eth ? Tm.toFixed(balances.eth) : '0.000000'}
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
                {balances && !balances.eth ? (
                  <InsufficientFunds
                    eth={balances.eth ? Tm.toFixed(balances.eth) : '0.000000'}
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
