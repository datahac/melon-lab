import React, { Fragment } from 'react';
import FactSheet from '~/components/Factsheet';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import ShutDownFund from '+/components/ShutDownFund';
import Composer from 'react-composer';

export default class FactsheetContainer extends React.PureComponent {
  state = {
    shutDown: false,
  };

  setShutDown = () => {
    this.setState(prevState => ({
      shutDown: !prevState.shutDown,
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
                shutDown={this.state.shutDown}
                setShutDown={this.setShutDown}
                fundAddress={address}
                update={managerProps.update}
              />
              <FactSheet
                {...fund}
                isManager={isManager}
                reportUrl={reportUrl}
                loading={loading}
                handleShutDown={this.setShutDown}
              />
            </Fragment>
          );
        }}
      </Composer>
    );
  }
}
