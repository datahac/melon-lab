import { types as actionTypes } from '../actions/modal';
import { types as modalTypes } from '../components/pages/Modal';

export const initialState = {
  isOpen: false,
  modalType: modalTypes.INFO,
  title: '',
  body: '',
  fees: null,
  method: '',
  primaryAction: 'Ok',
  secondaryAction: '',
};

export const reducer = (state = initialState, action = {}) => {
  const { type, ...params } = action;

  return Object.keys(actionTypes)
    .map(key => actionTypes[key])
    .includes(type)
    ? {
        ...state,
        ...params,
      }
    : state;
};

export default reducer;
