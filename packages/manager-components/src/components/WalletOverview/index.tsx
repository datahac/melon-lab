import React, { Fragment, StatelessComponent } from 'react';
import Link from '~/blocks/Link';
import Spinner from '~/blocks/Spinner';
import displayNumber from '~/utils/displayNumber';

import styles from './styles.css';

export interface WalletOverviewProps {
  associatedFund?: {
    address: string;
    name: string;
  };
  currentAddress?: string;
  networkId: string;
  loading?: boolean;
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
}) => {
  return (
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
                  <code>
                    <span className="wallet-overview__balance-value">
                      {balances &&
                        displayNumber(balances.eth ? balances.eth : 0)}
                    </span>
                  </code>
                </div>
                <div className="wallet-overview__balance">
                  MLN:
                  <br />
                  <code>
                    <span className="wallet-overview__balance-value">
                      {balances &&
                        displayNumber(balances.mln ? balances.mln : 0)}
                    </span>
                  </code>
                </div>
                <div className="wallet-overview__balance">
                  WETH:
                  <br />
                  <code>
                    <span className="wallet-overview__balance-value">
                      {balances &&
                        displayNumber(balances.weth ? balances.weth : 0)}
                    </span>
                  </code>
                </div>
              </div>
              <h2>Fund</h2>
              {associatedFund ? (
                <Fragment>
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
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default WalletOverview;
