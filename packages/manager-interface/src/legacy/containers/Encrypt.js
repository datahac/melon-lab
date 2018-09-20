import { actions } from '../actions/account';
import Encrypt from '../components/pages/account/Encrypt';

const onSubmit = (values, dispatch) => {
  if (values.password !== values.repeat) {
    throw new Error({
      repeat: 'Passwords do not match :(',
      _error: 'Passwords do not match :(',
    });
  } else if (!values.password || values.password.length < 3) {
    throw new Error({
      password: 'Password too short.',
      _error: 'Password too short.',
    });
  } else {
    dispatch(actions.encryptWallet(values.password));
  }
};

export default Encrypt;
