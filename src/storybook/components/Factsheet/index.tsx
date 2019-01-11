import React, { StatelessComponent, Fragment } from 'react';
import Button from '~/blocks/Button';
import Spinner from '~/blocks/Spinner';
import Link from '~/link';
import format from 'date-fns/format';
import * as Tm from '@melonproject/token-math';

import styles from './styles.css';

export interface FactsheetProps {
  inception?: string;
  isCompetition?: boolean;
  loading?: boolean;
  managementReward?: string;
  performanceReward?: string;
  personalStake?: string;
  reportUrl?: string;
  handleShutDown: () => void;
  totalSupply?: string;
  tweetHref?: string;
  isManager?: boolean;
  isShutdown?: boolean;
}

const Factsheet: StatelessComponent<FactsheetProps> = ({
  inception,
  isCompetition,
  loading,
  managementReward,
  performanceReward,
  personalStake,
  reportUrl,
  handleShutDown,
  totalSupply,
  isManager,
  isShutdown,
}) => (
  <div className="factsheet">
    <style jsx>{styles}</style>
    {loading ? (
      <div className="factsheet__spinner">
        <Spinner icon size="small" />
      </div>
    ) : (
      <Fragment>
        <div className="factsheet__item">
          Creation date: {inception && format(inception, 'DD. MMM YYYY HH:mm')}
          <br />
          Total number of shares:{' '}
          {totalSupply && Tm.quantity.toFixed(totalSupply)}
          <br />
          Shares owned by me:{' '}
          {personalStake && Tm.quantity.toFixed(personalStake)}
        </div>
        <div className="factsheet__item">
          Management Reward: {managementReward}%<br />
          Performance Reward: {performanceReward}%
        </div>
        <div className="factsheet__item">
          <a
            href="https://ipfs.io/ipfs/Qmc9JRw4zarrs6gJwu6tC58UAgeEujNg9VMWcH8MUEd5TW/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Investors/Managers
          </a>
          <br />
          <Link href={reportUrl}>
            <a target="_blank" rel="noopener noreferrer">
              Generate fund report
            </a>
          </Link>
        </div>
        {!isShutdown && !isCompetition && isManager && (
          <div className="factsheet__item">
            <Button onClick={handleShutDown} style="danger" size="small">
              Irreversibly shut down fund
            </Button>
          </div>
        )}
      </Fragment>
    )}
  </div>
);

export default Factsheet;
