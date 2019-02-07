import React, { useState, Fragment } from 'react';
import FactSheet from '~/components/Factsheet';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
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

const FactsheetContainer = ({ address, fund, loading, isManager, account }) => {
  const [shutDownModal, setShutDownModal] = useSetOpenModal(false);

  return (
    <Composer
      components={[
        <FundManagerConsumer />,
        <NetworkConsumer />,
        <SetupConsumer />,
      ]}
    >
      {([_, network, setup]) => {
        const reportUrl =
          address &&
          `https://${
            network.network === 'KOVAN' ? 'melon' : 'olympiad'
          }-reporting.now.sh/report/${address}`;

        return (
          <Fragment>
            <ShutDownFund
              shutDown={shutDownModal}
              setShutDown={setShutDownModal}
              fundAddress={address}
              update={setup.update}
            />
            <FactSheet
              {...fund}
              account={account}
              fundAddress={address}
              isManager={isManager}
              reportUrl={reportUrl}
              loading={loading}
              handleShutDown={setShutDownModal}
              isShutdown={setup.isShutdown}
            />
          </Fragment>
        );
      }}
    </Composer>
  );
};

export default FactsheetContainer;
