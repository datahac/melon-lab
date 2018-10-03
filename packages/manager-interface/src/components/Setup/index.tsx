import React from 'react';
import Setup from '@melonproject/manager-components/components/Setup/container';
import FundMutation from './data/fund';
import SignMutation from './data/sign';
import { compose, withState } from 'recompose';
import * as R from 'ramda';

const withSignState = withState('signature', 'setSignature', '');

const withSetup = BaseComponent => baseProps => (
  <SignMutation
    onCompleted={value =>
      baseProps.setSignature(R.omit(['__typename'], value.sign))
    }
  >
    {(sign, mutationProps) => (
      <FundMutation>
        {createFund => (
          <BaseComponent
            config={baseProps.config}
            onSubmit={values =>
              createFund({
                variables: {
                  name: values.name,
                  signature: baseProps.signature,
                },
              })
            }
            signature={baseProps.signature}
            onSign={() =>
              sign({ variables: { privateKey: baseProps.privateKey } })
            }
          />
        )}
      </FundMutation>
    )}
  </SignMutation>
);

export default compose(
  withSignState,
  withSetup,
)(Setup);
