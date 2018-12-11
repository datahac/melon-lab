import React, { Fragment } from 'react';
import Composer from 'react-composer';
import Participation from '~/components/ParticipationForm';
import { AccountConsumer } from '+/components/AccountContext';
import ApproveTransfer from '+/components/ApproveTransfer';
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
  };

  setInvestValues = values => {
    this.setState({
      values,
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
              />
            </Fragment>
          );
        }}
      </Composer>
    );
  }
}

export default withRouter(InvestContainer);
