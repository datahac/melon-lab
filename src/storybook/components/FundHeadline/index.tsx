import React, { StatelessComponent, Fragment } from 'react';
import Spinner from '~/blocks/Spinner';
import Button from '~/blocks/Button';
import Link from '~/blocks/Link';
import displayQuantity from '~/utils/displayQuantity';
import displayPrice from '~/utils/displayPrice';
import * as Tm from '@melonproject/token-math';
import format from 'date-fns/format';

import styles from './styles.css';

export interface FundHeadlineProps {
  name?: string;
  sharePrice?: Tm.PriceInterface;
  gav?: Tm.QuantityInterface;
  rank?: string;
  totalFunds?: string;
  quoteAsset?: string;
  address?: string;
  network?: string;
  loading?: boolean;
  decimals?: number;
  inception?: string;
  personalStake?: Tm.QuantityInterface;
  totalSupply?: Tm.QuantityInterface;
  account?: string;
  expiredRequest: boolean;
  isShutdown?: boolean;
  isManager?: boolean;
  handleShutDown: () => void;
  handleClaimRewards: () => void;
}

const FundHeadline: StatelessComponent<FundHeadlineProps> = ({
  name,
  sharePrice,
  gav,
  rank,
  totalFunds,
  address,
  network,
  loading,
  decimals = 4,
  inception,
  personalStake,
  totalSupply,
  account,
  isShutdown,
  isManager,
  expiredRequest,
  managementFeeRate,
  performanceFeeRate,
  performanceFeePeriod,
  handleShutDown,
  handleClaimRewards,
}) => {
  const prefix = network === 'kovan' ? 'kovan.' : '';
  const etherscanUrl =
    network === 'kovan' || (network === 'LIVE' && `https://${prefix}etherscan.io/address/${address}`);

  return (
    <div className="fund-headline">
      <style jsx>{styles}</style>
      {loading ? (
        <div className="fund-headline__spinner">
          <Spinner icon size="small" />
        </div>
      ) : (
        <Fragment>
          <div className="fund-headline__headline">
            <h1 className="fund-headline__title">{name}</h1>
            {etherscanUrl && (
              <div className="fund-headline__links">
                <a href={etherscanUrl} target="_blank" rel="noopener noreferrer" title={address}>
                  View on Etherscan
                </a>
              </div>
            )}

            <div className="fund-headline__actions">
              {account && address && (
                <Fragment>
                  {!isShutdown && (
                    <div className="fund-headline__action">
                      <Link
                        href={{
                          pathname: '/invest',
                          query: {
                            address,
                          },
                        }}
                        style="primary"
                        size="small"
                      >
                        Invest
                      </Link>
                    </div>
                  )}

                  <div className="fund-headline__action">
                    <Link
                      href={{
                        pathname: '/redeem',
                        query: {
                          address,
                        },
                      }}
                      style="primary"
                      size="small"
                    >
                      Redeem
                    </Link>
                  </div>

                  <div className="fund-headline__action">
                    <Link
                      href={{
                        pathname: '/policies',
                        query: {
                          address,
                        },
                      }}
                      style="primary"
                      size="small"
                    >
                      Add policies
                    </Link>
                  </div>

                  <div className="fund-headline__action">
                    <Button onClick={handleClaimRewards} style="primary" size="small">
                      Claim rewards
                    </Button>
                  </div>
                </Fragment>
              )}
              {!isShutdown && isManager && (
                <div className="fund-headline__action">
                  <Fragment>
                    <Button onClick={handleShutDown} style="danger" size="small">
                      Shut down
                    </Button>
                  </Fragment>
                </div>
              )}
              {expiredRequest && isManager && (
                <div className="fund-headline__expired">
                  You have an expired investment request. Click{' '}
                  <Link
                    href={{
                      pathname: '/invest',
                      query: {
                        address,
                      },
                    }}
                  >
                    here
                  </Link>{' '}
                  to cancel it.
                </div>
              )}
            </div>
          </div>
          <div className="fund-headline__information">
            <div className="fund-headline__item">
              <div className="fund-headline__item-title">Share price</div>
              {sharePrice && displayPrice(sharePrice, decimals)}
              /Share
            </div>
            <div className="fund-headline__item">
              <div className="fund-headline__item-title">AUM</div>
              {gav && displayQuantity(gav, decimals)}
            </div>
            <div className="fund-headline__item">
              <div className="fund-headline__item-title">Ranking</div>
              {rank} out of {totalFunds}
            </div>
            <div className="fund-headline__item">
              <div className="fund-headline__item-title">Creation date</div>
              {inception && format(inception, 'DD. MMM YYYY HH:mm')}
            </div>
            <div className="fund-headline__item">
              <div className="fund-headline__item-title">Total number of shares</div>
              {totalSupply && Tm.toFixed(totalSupply)}
            </div>
            <div className="fund-headline__item">
              {personalStake && (
                <Fragment>
                  <div className="fund-headline__item-title">Shares owned by me</div>
                  {personalStake && Tm.toFixed(personalStake)}
                </Fragment>
              )}
            </div>
            {managementFeeRate !== null && (
              <div className="fund-headline__item">
                <div className="fund-headline__item-title">Management fee</div>
                {managementFeeRate}%
              </div>
            )}
            {performanceFeeRate !== null && (
              <div className="fund-headline__item">
                <div className="fund-headline__item-title">Performance fee</div>
                {performanceFeeRate}%
              </div>
            )}
            {performanceFeePeriod !== null && (
              <div className="fund-headline__item">
                <div className="fund-headline__item-title">Performance fee period</div>
                {performanceFeePeriod / (60 * 60 * 24)} days
              </div>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default FundHeadline;
