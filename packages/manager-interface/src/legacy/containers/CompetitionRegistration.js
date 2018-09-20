import { connect } from 'react-redux';
import { actions } from '../actions/fund';
import { actions as routeActions } from '../actions/routes';
import CompetitionRegistration from '@melonproject/manager-components/components/CompetitionRegistration';

const mapStateToProps = state => ({
  fundAddress: state.fund.address,
  managerAddress: state.ethereum.account,
  showedRegistration: state.fund.showedRegistration,
  needsToRegister: state.fund.needsToRegister,
  competitionSignature: state.fund.competitionSignature,
  r: state.fund.competitionSignature
    ? state.fund.competitionSignature.r
    : undefined,
  s: state.fund.competitionSignature
    ? state.fund.competitionSignature.s
    : undefined,
  v: state.fund.competitionSignature
    ? state.fund.competitionSignature.v
    : undefined,
});

const mapDispatchToProps = dispatch => ({
  skipRegistration: () => dispatch(routeActions.root()),
  continueToSignCompetitionTerms: () => dispatch(actions.needsToRegister()),
  sign: () => dispatch(actions.signCompetitionRequested()),
  isRegistered: () => dispatch(routeActions.root()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompetitionRegistration);
