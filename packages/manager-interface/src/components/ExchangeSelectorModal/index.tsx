import React from 'react';
import Modal from '~/blocks/Modal';
import Button from '~/blocks/Button';
import Selector from '~/components/Selector';
import { withHandlers, compose, withState } from 'recompose';

const withItemsState = withState(
  'items',
  'setItems',
  props => props.selectedExchanges,
);

const withSelectorHandlers = withHandlers({
  onChangeExchanges: props => event => {
    const value = event.target.value;
    if (!props.items.includes(value)) {
      props.setItems([...props.items, value]);
    } else {
      props.setItems([...props.items.filter(item => item !== value)]);
    }
  },
  onSaveExchanges: props => event => {
    props.setFieldValue('exchanges', props.items);
    props.setIsOpen(false);
  },
  onCancelExchanges: props => event => {
    props.setIsOpen(false);
  },
});

const ExchangeSelectorModal = ({
  availableExchanges,
  onCancelExchanges,
  onSaveExchanges,
  onChangeExchanges,
  isOpen,
  items,
}) => (
  <Modal
    title="Select Exchanges"
    isOpen={isOpen}
    PrimaryAction={Button}
    PrimaryActionProps={{
      children: 'Cancel',
      style: 'secondary',
      onClick: onCancelExchanges,
    }}
    SecondaryAction={Button}
    SecondaryActionProps={{
      children: 'Confirm',
      onClick: onSaveExchanges,
    }}
  >
    <Selector
      onChange={onChangeExchanges}
      availableItems={availableExchanges}
      selectedItems={items}
    />
  </Modal>
);

export default compose(
  withItemsState,
  withSelectorHandlers,
)(ExchangeSelectorModal);
