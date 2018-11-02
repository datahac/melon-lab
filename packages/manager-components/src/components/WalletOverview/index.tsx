import React, { Fragment, StatelessComponent } from 'react';
import Link from '~/blocks/Link';
import Spinner from '~/blocks/Spinner';
import InsufficientFunds from '~/components/InsufficientFunds';
import displayNumber from '~/utils/displayNumber';
import { isZero } from '~/utils/functionalBigNumber';

import styles from './styles.css';

export interface WalletOverviewProps {
  associatedFund?: string;
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
                <AssociatedFund
                  associatedFund={associatedFund}
                  networkId={networkId}
                />
              ) : (
                <Fragment>
                  {!balances.eth || isZero(balances.eth) ? (
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
};

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
