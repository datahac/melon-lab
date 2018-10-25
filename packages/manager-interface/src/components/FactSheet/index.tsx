import React from 'react';
import FactSheet from '~/components/Factsheet';
import { NetworkConsumer } from '+/components/NetworkContext';

export default class FactsheetContainer extends React.PureComponent {
  render() {
    return (
      <NetworkConsumer>
        {network => {
          const { address, fund, totalFunds, loading } = this.props;
          const reportUrl =
            address &&
            `https://${
              network.network === 'KOVAN' ? 'melon' : 'olympiad'
            }-reporting.now.sh/report/${address}`;

          return (
            <FactSheet
              {...fund}
              numberOfFunds={totalFunds}
              reportUrl={reportUrl}
              loading={loading}
            />
          );
        }}
      </NetworkConsumer>
    );
  }
}
