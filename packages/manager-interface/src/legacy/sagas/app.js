import { takeLatest, select, put, take, call } from 'redux-saga/effects';
import { networks, tracks } from '@melonproject/melon.js';
import { onboardingPath } from '../reducers/app';
import { actions, types } from '../actions/app';
import {
  types as routeTypes,
  actions as routeActions,
} from '../actions/routes';
import { types as fundTypes, actions as fundActions } from '../actions/fund';
import isSameAddress from '../utils/isSameAddress';
import { isZero } from '../utils/functionalBigNumber';

import { types as browserTypes } from '../actions/browser';

function* init() {
  const track = global.TRACK || process.env.TRACK || 'kovan-demo';
  const isCompetition =
    track === tracks.KOVAN_COMPETITION || track === tracks.LIVE;

  if (!Object.values(tracks).includes(track)) {
    console.warn(`TRACK is set to ${track} which is not a supported track.`);
  }
  yield put(
    actions.setTrack({ track, isCompetition, isElectron: ELECTRON }),
  );
}

const getOnboardingState = ({ ethereum, app, fund }) => {
  if (!ethereum.isConnected) return onboardingPath.NO_CONNECTION;
  if (ethereum.network !== networks.KOVAN && ethereum.network !== networks.LIVE)
    return onboardingPath.WRONG_NETWORK;
  if (!ethereum.account) return onboardingPath.NO_ACCOUNT;
  if (
    isZero(ethereum.ethBalance) ||
    (!app.isCompetition && (isZero(ethereum.wethBalance) && !app.usersFund))
  )
    return onboardingPath.INSUFFICIENT_FUNDS;
  if (fund.signature === undefined && !app.usersFund)
    return onboardingPath.NOT_SIGNED;
  if (!app.usersFund) return onboardingPath.NO_FUND_CREATED;
  if (
    (isSameAddress(ethereum.account, fund.owner) && isZero(fund.totalSupply)) ||
    (!!app.usersFund && !fund.address)
  ) {
    // State does not change to TO_INVESTED_IN_OWN_FUND after fund setup; need reload atm
    return onboardingPath.NOT_INVESTED_IN_OWN_FUND;
  }
  return onboardingPath.ONBOARDED;
};

function* deriveReadyState() {
  const { app, ethereum, fund } = yield select(state => state);

  const isReadyToVisit = ethereum.network === '42' || ethereum.network === '1';

  const isReadyToInteract =
    isReadyToVisit &&
    ethereum.blockNumber > 0 &&
    !ethereum.syncing &&
    !!ethereum.account &&
    !isZero(ethereum.ethBalance);

  const isReadyToInvest =
    isReadyToInteract && app.isCompetition
      ? true
      : !isZero(ethereum.wethBalance);

  const isReadyToTrade =
    isReadyToInteract &&
    isSameAddress(fund.owner, ethereum.account) &&
    !isZero(fund.totalSupply);

  const readyState = {
    isReadyToVisit,
    isReadyToInteract,
    isReadyToInvest,
    isReadyToTrade,
    onboardingState: getOnboardingState({ app, ethereum, fund }),
  };

  const hasChanged = Object.keys(readyState).reduce(
    (acc, key) => acc || readyState[key] !== app[key],
    false,
  );

  if (hasChanged) yield put(actions.setReadyState(readyState));
}

function* redirectSaga() {
  const usersFundChecked = yield select(state => state.app.usersFundChecked);

  if (!usersFundChecked) {
    yield take(types.SET_USERS_FUND);
  }

  const usersFund = yield select(state => state.app.usersFund);

  if (usersFund) {
    const fundInfoReceived = yield select(
      state => !['', '-', '...'].includes(state.fund.name),
    );

    if (!fundInfoReceived) {
      yield put(fundActions.infoRequested(usersFund));
      yield take(fundTypes.INFO_SUCCEEDED);
    }

    const isReadyToTrade = yield select(state => state.app.isReadyToTrade);

    if (isReadyToTrade) {
      yield put(routeActions.fund(usersFund));
    } else {
      yield put(routeActions.setup());
    }
  } else {
    yield put(routeActions.ranking());
  }
}

function* scrollTo({ id }) {
  const target = document.getElementById(id);

  yield call(global.scrollTo, 0, target.offsetTop);
}

const onlyMelonActions = action =>
  action.type !== types.SET_READY_STATE && action.type.includes('melon');

function* appSaga() {
  yield takeLatest(browserTypes.LOADED, init);
  yield takeLatest(routeTypes.ROOT, redirectSaga);
  yield takeLatest(onlyMelonActions, deriveReadyState);
  yield takeLatest(types.SCROLL_TO, scrollTo);
}

export default appSaga;
