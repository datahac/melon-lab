import React from 'react';
import Composer from 'react-composer';
import FactSheet from '~/components/Factsheet';
import { NetworkConsumer } from '+/components/NetworkContext';

export default class WalletContainer extends React.PureComponent {
  render() {
    return (
      <Composer components={[<NetworkConsumer />]}>
        {([network]) => {
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
      </Composer>
    );
  }
}
