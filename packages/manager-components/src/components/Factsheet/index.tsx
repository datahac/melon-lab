import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Spinner from '~/blocks/Spinner';
import Link from '~/link';
import displayNumber from '~/utils/displayNumber';
import format from 'date-fns/format';

export interface FactsheetProps {
  gav?: string;
  inception?: string;
  isCompetition?: boolean;
  loading?: boolean;
  managementReward?: string;
  name?: string;
  numberOfFunds?: string;
  performanceReward?: string;
  personalStake?: string;
  quoteAsset?: string;
  rank?: string;
  reportUrl?: string;
  sharePrice?: string;
  shutdown: () => void;
  totalSupply?: string;
  tweetHref?: string;
  address?: string;
  track?: string;
  owner?: boolean;
  account?: string;
  decimals?: number;
}

const Factsheet: StatelessComponent<FactsheetProps> = ({
  gav,
  inception,
  isCompetition,
  loading,
  managementReward,
  name,
  numberOfFunds,
  performanceReward,
  personalStake,
  quoteAsset,
  rank,
  reportUrl,
  sharePrice,
  shutdown,
  totalSupply,
  address,
  track,
  owner,
  account,
  decimals = 5,
}) => {
  const isOwner = owner === account;

  const buildTwitterUrl = () => {
    const text = isOwner
      ? track !== 'live'
        ? `My #MelonFund "${name}" has a share price currently of ${sharePrice}. Have a look:`
        : `Check out my on-chain decentralized hedge fund "${name}". ` +
          `It currently has a share price of ${sharePrice}. Have a look:`
      : track !== 'live'
        ? `The #MelonFund "${name}" has a share price currently of ${sharePrice}. Have a look:`
        : `Check out this on-chain decentralized hedge fund "${name}". ` +
          `It currently has a share price of ${sharePrice}. Have a look:`;

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
    <div className="factsheet">
      {loading ? (
        <Spinner icon size="small" />
      ) : (
        <div>
          Creation date: {format(inception, 'DD. MMM YYYY HH:mm')}
          <br />
          AUM: {displayNumber(gav, decimals)} {quoteAsset}
          <br />
          Share price: {displayNumber(sharePrice, decimals)} {quoteAsset}
          /Share
          <br />
          <Link href="/">
            <a href="/">
              Ranking: {rank} out of {numberOfFunds}
            </a>
          </Link>
          <br />
          Total number of shares: {totalSupply}
          <br />
          Shares owned by me:{' '}
          {displayNumber(personalStake ? personalStake : '0')}
          <hr />
          Management Reward: {managementReward}%<br />
          Performance Reward: {performanceReward}%<hr />
          <a
            href="https://ipfs.io/ipfs/Qmc9JRw4zarrs6gJwu6tC58UAgeEujNg9VMWcH8MUEd5TW/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Investors/Managers
          </a>
          <br />
          <a
            className="factsheet__title-link"
            href={buildTwitterUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweet your Fund
          </a>
          <hr />
          <Link href={reportUrl}>
            <a target="_blank" rel="noopener noreferrer">
              Generate fund report
            </a>
          </Link>
          <hr />
          {!isCompetition &&
            isOwner && (
              <Button onClick={shutdown} style="clear">
                Irreversibly shut down fund
              </Button>
            )}
        </div>
      )}
    </div>
  );
};

export default Factsheet;
