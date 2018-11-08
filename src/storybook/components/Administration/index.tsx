import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';

import styles from './styles.css';

export interface AdministrationProps {
  convertUnclaimedRewards: () => void;
  fundAddress?: string;
  isCompeting?: boolean;
  loading?: boolean;
  quoteAsset: string;
  registerForCompetition?: () => void;
  shutdown: () => void;
  subscriptionAllowed?: boolean;
  toggleSubscription: () => void;
}

export const Administration: StatelessComponent<AdministrationProps> = ({
  convertUnclaimedRewards,
  fundAddress,
  isCompeting,
  loading,
  quoteAsset,
  registerForCompetition,
  shutdown,
  subscriptionAllowed,
  toggleSubscription,
}) => (
  <div className="administration">
    <style jsx>{styles}</style>
    <h3>Fund Administration</h3>
    {/* {!isCompeting ? (
          <Button onClick={() => registerForCompetition(fundAddress)}>
            Register for competition
          </Button>
        ) : (
          ""
        )} */}
    {subscriptionAllowed ? (
      <Button style="clear" onClick={toggleSubscription}>
        Disable subscription
      </Button>
    ) : (
      <Button style="clear" onClick={toggleSubscription}>
        Enable subscription
      </Button>
    )}

    <Button style="clear" onClick={convertUnclaimedRewards}>
      Convert unclaimed rewards: 0 {quoteAsset}
    </Button>
    <Button style="clear" onClick={shutdown}>
      Irreversibly shut down fund
    </Button>
    {loading && <p>Please wait for upcoming Metamask popup</p>}
  </div>
);

export default Administration;
