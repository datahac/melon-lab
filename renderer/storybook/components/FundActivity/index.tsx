import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';

export interface FundActivityProps {
  requestFullParticipationHistory: () => void;
}

export const FundActivity: StatelessComponent<FundActivityProps> = ({
  requestFullParticipationHistory,
  /*
  subscriptions,
  redemptions,
  */
}) => (
  <div className="fund-activity">
    <h3>Fund Activity</h3>
    <p>
      Recent Subscriptions
      <br />
      Recent Redemptions
    </p>
    <Button style="secondary" onClick={requestFullParticipationHistory}>
      Request full subscriptions/redeem history
    </Button>
  </div>
);

export default FundActivity;
