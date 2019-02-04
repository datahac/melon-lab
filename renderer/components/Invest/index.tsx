import * as Tm from '@melonproject/token-math';

import React, { Fragment } from 'react';
import Participation from '~/components/ParticipationForm';
import InvestTransactions from '+/components/InvestTransactions';
import withForm from './withForm';
import { withRouter } from 'next/router';
import { FundQuery } from './data/fund';
import { RequestQuery } from './data/request';
import * as R from 'ramda';
import Composer from 'react-composer';

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
      <Composer
        components={[
          <FundQuery address={this.props.address} />,
          <RequestQuery
            fundAddress={this.props.address}
            userAddress={'0xC0c82081f2Ad248391cd1483ae211d56c280887a'}
          />,
        ]}
      >
        {([fundProps, requestProps]) => {
          const waitingTime = R.pathOr(
            '0',
            ['data', 'hasActiveRequest', 'waitingTime'],
            requestProps,
          );
          const hasActiveRequest = R.path(
            ['data', 'hasActiveRequest'],
            requestProps,
          );

          const isWaiting = Tm.greaterThan(waitingTime, '0');
          const readyToExecute = Tm.isZero(waitingTime) && hasActiveRequest;
          const isInitialRequest = Tm.isZero(
            R.pathOr(
              '0',
              ['data', 'fund', 'totalSupply', 'quantity'],
              fundProps,
            ),
          );

          return (
            <Fragment>
              <ParticipationFormContainer
                {...this.props}
                setInvestValues={this.setInvestValues}
                loading={R.path(['loading'], fundProps)}
                sharePrice={R.path(['data', 'fund', 'sharePrice'], fundProps)}
                setStep={this.setStep}
                isWaiting={isWaiting}
                readyToExecute={readyToExecute}
                executeRequest={() => this.setStep(3)}
              />

              <InvestTransactions
                fundAddress={this.props.address}
                values={this.state.values}
                setStep={this.setStep}
                setInvestValues={this.setInvestValues}
                step={this.state.step}
                isWaiting={isWaiting}
                readyToExecute={readyToExecute}
                isInitialRequest={isInitialRequest}
              />
            </Fragment>
          );
        }}
      </Composer>
    );
  }
}

export default withRouter(InvestContainer);
