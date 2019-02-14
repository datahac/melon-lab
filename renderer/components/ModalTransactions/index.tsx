import React, { useState, useEffect, Fragment } from 'react';
import * as R from 'ramda';
import Modal from '~/blocks/Modal';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import FeeForm from '~/components/FeeForm';
import TransactionProgress from '~/components/TransactionProgress';
import Composer from 'react-composer';
import { Mutation } from 'react-apollo';
import withForm from './withForm';
import { compose } from 'recompose';
import { withRouter } from 'next/router';
import * as Tm from '@melonproject/token-math';
import ErrorModal from '+/components/ErrorModal';

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
    amguInEth,
    incentiveInEth,
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
          title={step}
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

          <TransactionProgress
            transactions={estimations}
            activeTransaction={step}
          />

          <FeeForm
            {...props}
            gasLimit={gasLimit}
            values={values}
            text={''}
            total={total}
            description={step}
            error={error}
            amguInEth={amguInEth}
            incentiveInEth={incentiveInEth}
          />
        </Modal>
      )
    );
  },
);

const ModalTransactions = ({
  executions,
  estimations,
  handleCancel,
  text,
  open,
}) => {
  const filteredEstimations = estimations.filter(
    mutation => !mutation.isComplete,
  );

  const offset = estimations.length - filteredEstimations.length;
  const estimation = R.head(filteredEstimations);
  const execution = R.head(executions.slice(offset, offset + 1));

  return (
    (estimation && execution && (
      <Composer
        components={[
          ({ render }) => (
            <Mutation {...R.omit(['name', 'isComplete'], estimation)}>
              {(a, b) => render([a, b])}
            </Mutation>
          ),
          ({ results: [[estimate, estimateProps]], render }) => (
            <Mutation
              {...execution}
              variables={{
                ...R.path(['data', 'estimate'], estimateProps),
                ...execution.variables,
              }}
            >
              {(a, b) => render([a, b])}
            </Mutation>
          ),
        ]}
      >
        {([[estimate, estimateProps], [execute, executeProps]]) => {
          return (
            <Fragment>
              <WithFormModal
                handleCancel={handleCancel}
                error={estimateProps.error || executeProps.error}
                loading={estimateProps.loading || executeProps.loading}
                text={text}
                open={open}
                estimate={estimate}
                execute={execute}
                estimations={estimations}
                current={estimation}
                step={
                  !R.isEmpty(filteredEstimations) && filteredEstimations[0].name
                }
                gasLimit={R.path(['data', 'estimate', 'gas'], estimateProps)}
                gasPrice={R.pathOr(
                  0,
                  ['data', 'estimate', 'gasPrice'],
                  estimateProps,
                )}
                amguInEth={R.path(
                  ['data', 'estimate', 'amguInEth'],
                  estimateProps,
                )}
                incentiveInEth={R.path(
                  ['data', 'estimate', 'incentiveInEth'],
                  estimateProps,
                )}
              />

              {!!(executeProps.error || estimateProps.error) && (
                <ErrorModal
                  error={executeProps.error || estimateProps.error}
                  handleSubmit={handleCancel}
                />
              )}
            </Fragment>
          );
        }}
      </Composer>
    )) ||
    null
  );
};

export default ModalTransactions;
