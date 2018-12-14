import React, { Fragment } from 'react';
import Participation from '~/components/ParticipationForm';
import ApproveTransfer from '+/components/ApproveTransfer';
import RequestInvestment from '+/components/RequestInvestment';
import ExecuteRequest from '+/components/ExecuteRequest';
import withForm from './withForm';
import { withRouter } from 'next/router';
import { QuoteTokenQuery } from './data/quoteToken';

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
      <QuoteTokenQuery>
        {quoteToken => (
          <Fragment>
            <ParticipationFormContainer
              {...this.props}
              setInvestValues={this.setInvestValues}
              quoteToken={quoteToken.data && quoteToken.data.quoteToken}
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
        )}
      </QuoteTokenQuery>
    );
  }
}

export default withRouter(InvestContainer);
