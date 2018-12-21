import React, { Fragment } from 'react';
import FactSheet from '~/components/Factsheet';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import ShutDownFund from '+/components/ShutDownFund';
import Composer from 'react-composer';

export default class FactsheetContainer extends React.PureComponent {
  state = {
    shutDownModal: false,
  };

  setShutDownModal = () => {
    this.setState(prevState => ({
      shutDownModal: !prevState.shutDownModal,
    }));
  };

  render() {
    return (
      <Composer components={[<FundManagerConsumer />, <NetworkConsumer />]}>
        {([managerProps, network]) => {
          const { address, fund, loading, isManager } = this.props;
          const reportUrl =
            address &&
            `https://${
              network.network === 'KOVAN' ? 'melon' : 'olympiad'
            }-reporting.now.sh/report/${address}`;

          return (
            <Fragment>
              <ShutDownFund
                shutDown={this.state.shutDownModal}
                setShutDown={this.setShutDownModal}
                fundAddress={address}
                update={managerProps.update}
              />
              <FactSheet
                {...fund}
                isManager={isManager}
                reportUrl={reportUrl}
                loading={loading}
                handleShutDown={this.setShutDownModal}
                isShutdown={fund.isShutdown}
              />
            </Fragment>
          );
        }}
      </Composer>
    );
  }
}
