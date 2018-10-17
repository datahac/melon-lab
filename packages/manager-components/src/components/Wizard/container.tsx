// Move into manager-interface

import Wizard from './index';
import { withHandlers, withState, compose } from 'recompose';

const withWizardState = compose(
  withState('page', 'setPage', 0),
  withHandlers({
    nextPage: props => event => {
      props.setPage(props.page + 1);
    },
    prevPage: props => event => {
      props.setPage(props.page - 1);
    },
  }),
);

export default compose(withWizardState)(Wizard);
