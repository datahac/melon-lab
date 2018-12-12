import React, { Fragment } from 'react';
import Composer from 'react-composer';
import Participation from '~/components/ParticipationForm';
import { AccountConsumer } from '+/components/AccountContext';
import ApproveTransfer from '+/components/ApproveTransfer';
import RequestInvestment from '+/components/RequestInvestment';
import withForm from './withForm';
import { withRouter } from 'next/router';

const ParticipationFormContainer = withForm(props => (
  <Participation
    {...props}
    setup={true}
    setInvestValues={props.setInvestValues}
  />
));

class InvestContainer extends React.PureComponent {
  state = {
    values: undefined,
    approved: false,
  };

  setInvestValues = values => {
    this.setState({
      values,
    });
  };

  setApproved = approved => {
    this.setState({
      approved,
    });
  };

  render() {
    return (
      <Composer components={[<AccountConsumer />]}>
        {([account]) => {
          return (
            <Fragment>
              <ParticipationFormContainer
                {...this.props}
                setInvestValues={this.setInvestValues}
              />
              <ApproveTransfer
                fundAddress={this.props.address}
                values={this.state.values}
                setInvestValues={this.setInvestValues}
                setApproved={this.setApproved}
                approved={this.state.approved}
              />

              <RequestInvestment
                fundAddress={this.props.address}
                values={this.state.values}
                approved={this.state.approved}
                setInvestValues={this.setInvestValues}
              />
            </Fragment>
          );
        }}
      </Composer>
    );
  }
}

export default withRouter(InvestContainer);
