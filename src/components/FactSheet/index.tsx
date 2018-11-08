import React from 'react';
import FactSheet from '~/components/Factsheet';
import { NetworkConsumer } from '+/components/NetworkContext';

export default class FactsheetContainer extends React.PureComponent {
  render() {
    return (
      <NetworkConsumer>
        {network => {
          const { address, fund, loading, isManager } = this.props;
          const reportUrl =
            address &&
            `https://${
              network.network === 'KOVAN' ? 'melon' : 'olympiad'
            }-reporting.now.sh/report/${address}`;

          return (
            <FactSheet
              {...fund}
              isManager={isManager}
              reportUrl={reportUrl}
              loading={loading}
            />
          );
        }}
      </NetworkConsumer>
    );
  }
}
