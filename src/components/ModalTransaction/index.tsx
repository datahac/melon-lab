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
    componentDidMount() {
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
        !!process.browser && (
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

export default class ModalTransaction extends React.Component {
  render() {
    return (
      <Composer
        components={[
          ({ render }) => (
            <Mutation {...R.omit(['variables'], this.props.estimate)}>
              {(a, b) => render([a, b])}
            </Mutation>
          ),
          ({ render }) => (
            <Mutation {...R.omit(['variables'], this.props.execute)}>
              {(a, b) => render([a, b])}
            </Mutation>
          ),
        ]}
      >
        {([[estimate, estimateProps], [execute, executeProps]]) => {
          const transaction = R.path(['data', 'estimate'], estimateProps);

          const doEstimate = () => {
            const variables = R.pathOr(
              () => undefined,
              ['estimate', 'variables'],
              this.props,
            )(this.props);

            estimate({
              variables,
            });
          };

          const doExecute = gasPrice => {
            const variables = R.pathOr(
              (props, transaction) => transaction,
              ['execute', 'variables'],
              this.props,
            )(this.props, {
              ...transaction,
              gasPrice,
            });

            execute({
              variables,
            });
          };

          const fees = [
            {
              // TODO: Does this still have to be a list?
              gasLimit: R.prop('gas', transaction),
            },
          ];

          return (
            <WithFormModal
              handleCancel={this.props.handleCancel}
              error={estimateProps.error || executeProps.error}
              loading={estimateProps.loading || executeProps.loading}
              estimateProps={estimateProps}
              gasPrice={R.path(['data', 'estimate', 'gasPrice'], estimateProps)}
              text={this.props.text}
              open={this.props.open}
              fees={fees}
              estimate={doEstimate}
              execute={doExecute}
            />
          );
        }}
      </Composer>
    );
  }
}
