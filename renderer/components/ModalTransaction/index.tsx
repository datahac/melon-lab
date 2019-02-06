import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import Modal from '~/blocks/Modal';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import FeeForm from '~/components/FeeForm';
import Composer from 'react-composer';
import { Mutation } from 'react-apollo';
import withForm from './withForm';
import { compose } from 'recompose';
import { withRouter } from 'next/router';
import * as Tm from '@melonproject/token-math';

const WithFormModal = compose(
  withForm,
  withRouter,
)(
  ({
    open,
    loading,
    text,
    error,
    estimate,
    handleCancel,
    handleSubmit,
    estimations,
    step,
    gasLimit,
    current,
    values,
    ...props
  }) => {
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
      setRendered(true);

      if (process.browser && open) {
        estimate();
      }
    }, [open, current]);

    const total =
      gasLimit &&
      values.gasPrice &&
      Tm.createQuantity(
        {
          symbol: 'ETH',
          decimals: 18,
        },
        (gasLimit * values.gasPrice).toString(),
      );

    return (
      rendered && (
        <Modal
          title="Fees"
          loading={loading}
          isOpen={open}
          PrimaryAction={Button}
          PrimaryActionProps={{
            children: 'Cancel',
            style: 'secondary',
            onClick: handleCancel,
          }}
          SecondaryAction={Button}
          SecondaryActionProps={{
            children: 'Confirm',
            type: 'submit',
            disabled: loading || error,
          }}
          ContentWrapper={Form}
          ContentWrapperProps={{
            onSubmit: handleSubmit,
          }}
        >
          {text}

          <FeeForm
            {...props}
            gasLimit={gasLimit}
            values={values}
            text={''}
            total={total}
            description={step}
          />
        </Modal>
      )
    );
  },
);

const ModalTransaction = ({ execute, estimate, handleCancel, text, open }) => (
  <Composer
    components={[
      ({ render }) => (
        <Mutation {...estimate}>{(a, b) => render([a, b])}</Mutation>
      ),
      ({ results: [[estimate, estimateProps]], render }) => (
        <Mutation
          {...execute}
          variables={{
            ...R.path(['data', 'estimate'], estimateProps),
            ...execute.variables,
          }}
        >
          {(a, b) => render([a, b])}
        </Mutation>
      ),
    ]}
  >
    {([[estimate, estimateProps], [execute, executeProps]]) => {
      return (
        <WithFormModal
          handleCancel={handleCancel}
          error={estimateProps.error || executeProps.error}
          loading={estimateProps.loading || executeProps.loading}
          text={text}
          open={open}
          gasLimit={R.path(['data', 'estimate', 'gas'], estimateProps)}
          gasPrice={R.path(['data', 'estimate', 'gasPrice'], estimateProps)}
          current={estimate}
          estimate={estimate}
          execute={execute}
        />
      );
    }}
  </Composer>
);

export default ModalTransaction;
