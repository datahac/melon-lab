import { connect } from 'react-redux';
import isSameAddress from '../utils/isSameAddress';
import Fund from '../components/pages/Fund';

const mapStateToProps = state => {
  const isManager =
    state.app.isReadyToInteract &&
    isSameAddress(state.ethereum.account, state.fund.owner);
  const isCompetition = state.app.isCompetition;

  return {
    loading: state.fund.loading,
    isVisitor: state.app.isReadyToVisit && !state.app.usersFund,
    isInvestor:
      state.app.isReadyToInteract &&
      !isSameAddress(state.ethereum.account, state.fund.owner),
    isManager,
    canInvest: state.app.isReadyToInteract,
    pendingRequest: state.fund.pendingRequest,
    // fundAddress: ownProps.match.params.fundAddress,
    isCompetition,
    hasContributed: state.fund.totalSupply == 0 ? false : true,
    isCompetitionActive: state.fund.isParosActive,
  };
};

export default connect(mapStateToProps)(Fund);
