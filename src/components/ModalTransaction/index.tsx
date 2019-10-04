import React, { useState, useEffect, Fragment } from 'react';
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
import ErrorModal from '+/components/ErrorModal';
import { SettingsConsumer } from '+/components/SettingsContext';

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
    setGasPrice,
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
        Tm.multiply(gasLimit, 1000000000, values.gasPrice).toString(),
      );

    function extendendHandleSubmit(...args) {
      handleSubmit(...args);
      setGasPrice(values.gasPrice);
    }

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
            onSubmit: extendendHandleSubmit,
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
            error={error}
            amguInEth={amguInEth}
            incentiveInEth={incentiveInEth}
          />
        </Modal>
      )
    );
  },
);

const ModalTransaction = ({ execute, estimate, handleCancel, text, open, step }) => {
  return (
    <Composer
      components={[
        ({ render }) => <Mutation {...estimate}>{(a, b) => render([a, b])}</Mutation>,
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
        <SettingsConsumer />,
      ]}
    >
      {([[estimate, estimateProps], [execute, executeProps], { gasPrice, setGasPrice }]) => {
        return (
          <Fragment>
            <WithFormModal
              handleCancel={handleCancel}
              error={estimateProps.error || executeProps.error}
              loading={estimateProps.loading || executeProps.loading}
              text={text}
              open={open}
              gasLimit={R.path(['data', 'estimate', 'gas'], estimateProps)}
              gasPrice={gasPrice}
              setGasPrice={setGasPrice}
              current={estimate}
              estimate={estimate}
              execute={execute}
              step={step}
            />

            {!!(executeProps.error || estimateProps.error) && (
              <ErrorModal error={executeProps.error || estimateProps.error} handleSubmit={handleCancel} />
            )}
          </Fragment>
        );
      }}
    </Composer>
  );
};

export default ModalTransaction;
