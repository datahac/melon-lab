import React, { StatelessComponent, Fragment } from 'react';
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
  address,
  track,
  loading,
  decimals = 4,
}) => {
  const fundUrl =
    track === 'live'
      ? `https://etherscan.io/address/${address}`
      : `https://kovan.etherscan.io/address/${address}`;

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
            <div className="fund-headline__address">
              <a href={fundUrl} target="_blank" rel="noopener noreferrer">
                {address}
              </a>
            </div>
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
