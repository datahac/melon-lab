import React from 'react';
import Composer from 'react-composer';
import Participation from '~/components/ParticipationForm';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import { withRouter } from 'next/router';
import withForm from './withForm';

const ParticipationForm = withForm(Participation);

class InvestContainer extends React.PureComponent {
  render() {
    return (
      <Composer
        components={[
          <AccountConsumer />,
          <FundManagerConsumer />,
          <BalanceConsumer />,
          <NetworkConsumer />,
        ]}
      >
        {([account, associatedFund, balances, network]) => {
          return <ParticipationForm setup={true} />;
        }}
      </Composer>
    );
  }
}

export default withRouter(InvestContainer);
