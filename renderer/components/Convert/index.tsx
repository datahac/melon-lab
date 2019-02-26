import React, { useState, Fragment } from 'react';
import ConvertForm from '~/components/ConvertForm';
import withForm from './withForm';
import { withRouter } from 'next/router';
import Composer from 'react-composer';
import { AccountConsumer } from '+/components/AccountContext';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import { BalanceConsumer } from '../BalanceContext';

const ConvertFormContainer = withForm(props => <ConvertForm {...props} />);

const InvestContainer = ({ address, ...props }) => {
  const [convertValues, setConvertValues] = useState(null);

  return (
    <Composer components={[<AccountConsumer />, <BalanceConsumer />]}>
      {([accountProps, balanceProps]) => {
        console.log(accountProps, balanceProps);
        return (
          <Fragment>
            <ConvertFormContainer
              {...props}
              address={address}
              setConvertValues={setConvertValues}
              account={accountProps}
              ethBalance={balanceProps.eth}
              wethBalance={balanceProps.weth}
            />
          </Fragment>
        );
      }}
    </Composer>
  );
};

export default compose(
  withRouter,
  withApollo,
)(InvestContainer);
