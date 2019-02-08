import React, { useState, Fragment } from 'react';
import FundHeadline from '~/components/FundHeadline';
import { SetupConsumer } from '+/components/SetupContext';
import ShutDownFund from '+/components/ShutDownFund';
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

  return (
    <Composer components={[<SetupConsumer />]}>
      {([setup]) => {
        return (
          <Fragment>
            <ShutDownFund
              shutDown={shutDownModal}
              setShutDown={setShutDownModal}
              fundAddress={address}
              update={setup.update}
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
            />
          </Fragment>
        );
      }}
    </Composer>
  );
};

export default FundHeadlineContainer;
