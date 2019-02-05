import React from 'react';
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

const WithFormModal = compose(
  withForm,
  withRouter,
)(
  class extends React.Component {
    state = {
      rendered: false,
    };

    componentDidMount() {
      this.setState({ rendered: true });

      if (process.browser && this.props.open) {
        this.props.estimate();
      }
    }

    componentDidUpdate(prevProps) {
      if (process.browser && this.props.open) {
        if (
          !prevProps.open ||
          !R.equals(this.props.current, prevProps.current)
        ) {
          this.props.estimate();
        }
      }
    }

    render() {
      const total =
        this.props.gasLimit &&
        this.props.values.gasPrice &&
        Tm.createQuantity(
          {
            symbol: 'ETH',
            decimals: 18,
          },
          (this.props.gasLimit * this.props.values.gasPrice).toString(),
        );

      return (
        this.state.rendered && (
          <Modal
            title="Fees"
            loading={this.props.loading}
            isOpen={this.props.open}
            PrimaryAction={Button}
            PrimaryActionProps={{
              children: 'Cancel',
              style: 'secondary',
              onClick: this.props.handleCancel,
            }}
            SecondaryAction={Button}
            SecondaryActionProps={{
              children: 'Confirm',
              type: 'submit',
              disabled: this.props.loading || this.props.error,
            }}
            ContentWrapper={Form}
            ContentWrapperProps={{
              onSubmit: this.props.handleSubmit,
            }}
          >
            {this.props.text}

            <TransactionProgress
              transactions={this.props.estimations}
              activeTransaction={this.props.step}
            />

            <FeeForm
              {...this.props}
              text={''}
              total={total}
              description={this.props.step}
            />
          </Modal>
        )
      );
    }
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
            <WithFormModal
              handleCancel={handleCancel}
              error={estimateProps.error || executeProps.errors}
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
              gasPrice={R.path(['data', 'estimate', 'gasPrice'], estimateProps)}
            />
          );
        }}
      </Composer>
    )) ||
    null
  );
};

export default ModalTransactions;
