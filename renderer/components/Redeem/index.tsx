import React, { Fragment } from 'react';
import RedeemForm from '~/components/ReedemForm';
import withForm from './withForm';
import { withRouter } from 'next/router';
import { FundQuery } from './data/fund';
import * as R from 'ramda';
import Composer from 'react-composer';
import { AccountConsumer } from '+/components/AccountContext';

const RedeemFormContainer = withForm(props => <RedeemForm {...props} />);

class RedeemContainer extends React.PureComponent {
  state = {
    values: null,
  };

  setRedeemValues = values => {
    this.setState({
      values,
    });
  };

  render() {
    return (
      <Composer
        components={[
          <AccountConsumer />,
          <FundQuery address={this.props.address} />,
        ]}
      >
        {([account, fundProps]) => {
          return (
            <Fragment>
              <RedeemFormContainer
                {...this.props}
                loading={R.path(['loading'], fundProps)}
                setRedeemValues={this.setRedeemValues}
                sharePrice={R.path(['data', 'fund', 'sharePrice'], fundProps)}
              />
            </Fragment>
          );
        }}
      </Composer>
    );
  }
}

export default withRouter(RedeemContainer);
