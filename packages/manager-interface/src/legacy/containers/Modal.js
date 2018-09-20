import { connect } from 'react-redux';
import Modal from '../components/pages/Modal';
import { actions, interactions } from '../actions/modal';
import { getEnvironment, setEnvironment } from '@melonproject/melon.js';

const mapStateToProps = state => ({
  ...state.modal,
  type: state.modal.modalType,
});

const mapDispatchToProps = dispatch => ({
  interactionHandler: (event, interaction) => {
    // Hint: Submit is handled by the form, not as action. But we need to
    // prevent form submitting for the other actions.
    if (interaction === interactions.CANCEL) {
      dispatch(actions.cancel());
    } else {
      dispatch(actions.confirmed());
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
