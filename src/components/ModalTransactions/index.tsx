import React from 'react';
import * as R from 'ramda';
import Modal from '~/blocks/Modal';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import FeeForm from '~/components/FeeForm';
import TransactionProgress from '~/components/TransactionProgress';
import Composer from 'react-composer';
import { Mutation } from '~/shared/graphql/apollo';
import withForm from './withForm';
import { compose } from 'recompose';
import { withRouter } from 'next/router';

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
      if (process.browser && this.props.open && !prevProps.open) {
        this.props.estimate();
      }
    }

    render() {
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
            <FeeForm {...this.props} text={''} />
          </Modal>
        )
      );
    }
  },
);

export default class ModalTransactions extends React.Component {
  render() {
    const estimations = this.props.estimations.filter(
      estimateMutation => !estimateMutation.isComplete,
    );

    const executions = this.props.executions.filter(
      (executeMutation, index) =>
        !this.props.estimations[index].isComplete && executeMutation,
    );

    return (
      <Composer
        components={R.flatten(R.zip(estimations, executions)).map(mutation => {
          return ({ render }) => (
            <Mutation
              {...R.omit(['variables', 'name', 'isComplete'], mutation)}
            >
              {(a, b) => render([a, b])}
            </Mutation>
          );
        })}
      >
        {results => {
          const estimate = !R.isEmpty(results) && results[0][0];
          const estimateProps = !R.isEmpty(results) && results[0][1];
          const execute = !R.isEmpty(results) && results[1][0];
          const executeProps = !R.isEmpty(results) && results[1][1];
          const transaction = R.path(['data', 'estimate'], estimateProps);

          const doEstimate = () => {
            const variables = R.pathOr(
              () => undefined,
              ['variables'],
              estimations[0],
            )(estimations[0]);

            estimate({
              variables,
            });
          };

          const doExecute = gasPrice => {
            const variables = R.pathOr(
              (_, transaction) => transaction,
              ['variables'],
              executions[0],
            )(executions[0], {
              ...transaction,
              gasPrice,
            });

            execute({
              variables,
            });
          };

          const fees = [
            {
              gasLimit: R.prop('gas', transaction),
            },
          ];

          return (
            <WithFormModal
              handleCancel={this.props.handleCancel}
              error={estimateProps.error || executeProps.errors}
              loading={estimateProps.loading || executeProps.loading}
              gasPrice={R.path(['data', 'estimate', 'gasPrice'], estimateProps)}
              text={this.props.text}
              open={this.props.open}
              fees={fees}
              estimate={doEstimate}
              execute={doExecute}
              estimations={this.props.estimations}
              step={!R.isEmpty(estimations) && estimations[0].name}
            />
          );
        }}
      </Composer>
    );
  }
}
