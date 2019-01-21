import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';

import styles from './styles.css';

export interface ClaimRewardProps {
  claimReward: () => void;
  competitionName: string;
  endTime?: string;
  isCompetitionActive?: boolean;
  redeemParosShares: () => void;
}

export const ClaimReward: StatelessComponent<ClaimRewardProps> = ({
  claimReward,
  competitionName = 'Naxos',
  endTime,
  isCompetitionActive,
  redeemParosShares,
}) => (
  <div className="claim-reward">
    <style jsx>{styles}</style>
    <h3>{competitionName} reward</h3>
    {isCompetitionActive ? (
      <div className="claim-reward__message">
        {competitionName} reward can only be claimed at the end of the{' '}
        {competitionName} epoch. The competition will end on {endTime}
      </div>
    ) : (
      <Fragment>
        <div className="claim-reward__message">
          {competitionName} has ended. You can now claim your reward. By
          clicking the "Claim shares" button, the shares of your fund will be
          transfered back to your account. Then click on the "Redeem" button,
          and the underlying assets of your fund will then be transfered to your
          manager address.
        </div>
        <ul className="claim-reward__steps">
          <li className="claim-reward__step">
            <span className="claim-reward__step-text">
              Claim my shares from the {competitionName} contract
            </span>
            <Button onClick={claimReward}>Claim</Button>
          </li>
          <li className="claim-reward__step">
            <span className="claim-reward__step-text">Redeem my shares</span>
            <Button onClick={redeemParosShares}>Redeem</Button>
          </li>
        </ul>
      </Fragment>
    )}
  </div>
);

export default ClaimReward;
