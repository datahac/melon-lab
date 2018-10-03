import React from 'react';
import Setup from '@melonproject/manager-components/components/Setup/container';
import FundMutation from './data/fund';
import { compose } from 'recompose';

const withSetup = BaseComponent => baseProps => (
  <FundMutation>
    {createFund => (
      <BaseComponent
        config={baseProps.config}
        onSubmit={values =>
          createFund({
            variables: {
              name: values.name,
              signed: values.signed,
              privateKey: baseProps.privateKey
            },
          })
        }
      />
    )}
  </FundMutation>
);

export default compose(
  withSetup,
)(Setup);
