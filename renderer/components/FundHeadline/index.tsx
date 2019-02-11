import React, { useState, Fragment } from 'react';
import FundHeadline from '~/components/FundHeadline';
import { SetupConsumer } from '+/components/SetupContext';
import ShutDownFund from '+/components/ShutDownFund';
import ClaimRewards from '+/components/ClaimRewards';
import Composer from 'react-composer';

const useSetOpenModal = isOpen => {
  const [current, set] = useState(isOpen);

  const setFromEvent = () => {
    set(!current);
  };

  return [current, setFromEvent];
};

const FundHeadlineContainer = ({
  address,
  fund,
  loading,
  isManager,
  account,
  totalFunds,
  quoteAsset,
}) => {
  const [shutDownModal, setShutDownModal] = useSetOpenModal(false);
  const [claimRewardsModal, setClaimRewardsModal] = useSetOpenModal(false);

  return (
    <Composer components={[<SetupConsumer />]}>
      {([setup]) => {
        return (
          <Fragment>
            {claimRewardsModal}
            <ShutDownFund
              shutDown={shutDownModal}
              setShutDown={setShutDownModal}
              fundAddress={address}
              update={setup.update}
            />

            <ClaimRewards
              claimRewards={claimRewardsModal}
              setClaimRewards={setClaimRewardsModal}
              fundAddress={address}
            />

            <FundHeadline
              {...fund}
              account={account}
              address={address}
              isManager={isManager}
              loading={loading}
              handleShutDown={setShutDownModal}
              isShutdown={setup.isShutdown}
              totalFunds={totalFunds}
              quoteAsset={quoteAsset}
              handleClaimRewards={setClaimRewardsModal}
            />
          </Fragment>
        );
      }}
    </Composer>
  );
};

export default FundHeadlineContainer;
