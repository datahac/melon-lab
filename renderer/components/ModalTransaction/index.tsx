import React from 'react';
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
          !R.equals(prevProps.current, this.props.current)
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
            <FeeForm {...this.props} total={total} />
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
            <Mutation {...this.props.estimate}>
              {(a, b) => render([a, b])}
            </Mutation>
          ),
          ({ results: [[estimate, estimateProps]], render }) => (
            <Mutation
              {...this.props.execute}
              variables={{
                ...R.path(['data', 'estimate'], estimateProps),
                ...this.props.execute.variables,
              }}
            >
              {(a, b) => render([a, b])}
            </Mutation>
          ),
        ]}
      >
        {([[estimate, estimateProps], [execute, executeProps]]) => {
          const transaction = R.path(['data', 'estimate'], estimateProps);
          const price = R.prop('gasPrice', transaction);
          const gasLimit = R.prop('gas', transaction);

          return (
            <WithFormModal
              handleCancel={this.props.handleCancel}
              error={estimateProps.error || executeProps.error}
              loading={estimateProps.loading || executeProps.loading}
              gasPrice={price}
              text={this.props.text}
              open={this.props.open}
              gasLimit={gasLimit}
              current={this.props.estimate}
              estimate={estimate}
              execute={execute}
            />
          );
        }}
      </Composer>
    );
  }
}
