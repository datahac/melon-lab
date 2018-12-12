import React, { Fragment } from 'react';
import Composer from 'react-composer';
import Participation from '~/components/ParticipationForm';
import { AccountConsumer } from '+/components/AccountContext';
import ApproveTransfer from '+/components/ApproveTransfer';
import RequestInvestment from '+/components/RequestInvestment';
import ExecuteRequest from '+/components/ExecuteRequest';
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
    values: null,
    step: null,
  };

  setInvestValues = values => {
    this.setState({
      values,
      step: 0,
    });
  };

  setStep = step => {
    this.setState({
      step,
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
                setStep={this.setStep}
                step={this.state.step}
              />

              <RequestInvestment
                fundAddress={this.props.address}
                values={this.state.values}
                setStep={this.setStep}
                step={this.state.step}
              />

              <ExecuteRequest
                fundAddress={this.props.address}
                values={this.state.values}
                setStep={this.setStep}
                step={this.state.step}
              />
            </Fragment>
          );
        }}
      </Composer>
    );
  }
}

export default withRouter(InvestContainer);
