import React from 'react';
import Setup from '@melonproject/manager-components/components/Setup/container';
import FundMutation from './data/fund';

const withSetup = BaseComponent => baseProps => (
  <FundMutation>
    {createFund => (
      <BaseComponent
        config={baseProps.config}
        onSubmit={values =>
          createFund({
            variables: {
              name: values.name,
            },
          })
        }
      />
    )}
  </FundMutation>
);

export default withSetup(Setup);
