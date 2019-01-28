import React, { StatelessComponent, Fragment } from 'react';
import Icons from '~/design/Icons';
import Spinner from '~/blocks/Spinner';
import displayQuantity from '~/shared/utils/displayQuantity';
import displayPrice from '~/shared/utils/displayPrice';
import * as Tm from '@melonproject/token-math';

import styles from './styles.css';

export interface FundHeadlineProps {
  name?: string;
  sharePrice?: Tm.PriceInterface;
  gav?: Tm.QuantityInterface;
  rank?: string;
  totalFunds?: string;
  quoteAsset?: string;
  owner?: string;
  account?: string;
  address?: string;
  track?: string;
  loading?: boolean;
  decimals?: number;
}

const FundHeadline: StatelessComponent<FundHeadlineProps> = ({
  name,
  sharePrice,
  gav,
  rank,
  totalFunds,
  owner,
  account,
  address,
  track,
  loading,
  decimals = 4,
}) => {
  const isOwner = owner === account;
  const buildTwitterUrl = () => {
    const text = isOwner
      ? track !== 'live'
        ? `My #MelonFund "${name}" has a share price currently of ${sharePrice &&
            displayPrice(sharePrice)}. Have a look:`
        : `Check out my on-chain decentralized hedge fund "${name}". ` +
          `It currently has a share price of ${sharePrice &&
            displayPrice(sharePrice)}. Have a look:`
      : track !== 'live'
      ? `The #MelonFund "${name}" has a share price currently of ${sharePrice &&
          displayPrice(sharePrice)}. Have a look:`
      : `Check out this on-chain decentralized hedge fund "${name}". ` +
        `It currently has a share price of ${sharePrice &&
          displayPrice(sharePrice)}. Have a look:`;

    const url =
      track === 'live'
        ? `https://olympiad.melon.fund/#${address}`
        : `https://melon.fund/#${address}`;
    const hashtags = 'TechnologyRegulatedFunds,Melon,MelonFund';
    const via = 'melonport';
    const related = 'melonport';

    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text,
    )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(
      hashtags,
    )}&via=${encodeURIComponent(via)}&related=${encodeURIComponent(related)}`;
  };

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
            <h1 className="fund-headline__title">
              {name}{' '}
              <span className="fund-headline__twitter">
                <a
                  href={buildTwitterUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons width="14px" height="14px" name="twitter" />
                </a>
              </span>
            </h1>
          </div>
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
        </Fragment>
      )}
    </div>
  );
};

export default FundHeadline;
