import React from 'react';
import * as R from 'ramda';
import Modal from '~/blocks/Modal';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import FeeForm from '~/components/FeeForm';
import Composer from 'react-composer';
import { Mutation } from '~/apollo';
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
            <FeeForm {...this.props} />
          </Modal>
        )
      );
    }
  },
);

export default class ModalTransactions extends React.Component {
  state = {
    step: 0,
    gas: 0,
    fees: [],
    text: '',
  };

  setStep = step => {
    this.setState({
      step,
    });
  };

  setGas = gas => {
    this.setState({
      gas,
    });
  };

  setFees = fees => {
    this.setState({
      fees,
    });
  };

  setText = text => {
    this.setState({
      text,
    });
  };

  render() {
    const mergedMutations =
      this.props.estimations &&
      R.flatten(
        this.props.estimations.map((estimateMutation, i) => {
          if (estimateMutation.isComplete) return [];
          const executeMutation = this.props.executions[i];
          return [estimateMutation, executeMutation];
        }),
      );

    return (
      <Composer
        components={mergedMutations.map(mutation => {
          return ({ render }) => (
            <Mutation {...R.omit(['variables'], mutation)}>
              {(a, b) => render([a, b])}
            </Mutation>
          );
        })}
      >
        {results => {
          const doEstimate = async () => {
            const variables = R.pathOr(
              () => undefined,
              ['variables'],
              mergedMutations[this.state.step],
            )(mergedMutations[this.state.step]);

            const data = await results[this.state.step][0]({
              variables,
            });

            this.setGas(R.path(['data', 'estimate', 'gasPrice'], data));
            this.setFees([
              {
                gasLimit: R.path(['data', 'estimate', 'gas'], data),
              },
            ]);
            this.setText(mergedMutations[this.state.step].text);
          };

          const doExecute = async gasPrice => {
            const transaction = R.path(
              ['data', 'estimate'],
              results[this.state.step][1],
            );

            const variables = R.pathOr(
              () => undefined,
              ['variables'],
              mergedMutations[this.state.step + 1],
            )(mergedMutations[this.state.step + 1], {
              ...transaction,
              gasPrice,
            });

            results[this.state.step + 1][0]({
              variables,
            });
          };

          const loading = results
            .map(item => {
              return item[1].loading;
            })
            .some(loading => loading === true);

          return (
            <WithFormModal
              handleCancel={this.props.handleCancel}
              error={false}
              loading={loading}
              estimateProps={{}}
              gasPrice={this.state.gas}
              text={this.state.text}
              open={this.props.open}
              fees={this.state.fees}
              estimate={doEstimate}
              execute={doExecute}
            />
          );
        }}
      </Composer>
    );
  }
}
