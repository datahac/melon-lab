import {
  getEnvironment,
  getFundForManager,
  getFundInformations,
  getLastRequest,
  getParticipation,
  isInvestAllowed,
  performCalculations,
  requestStatus,
  getAddress,
  getConfig,
  isCompetitionActive,
  getEndTime,
} from '@melonproject/melon.js';
import { takeLatest, put, call, take, select } from 'redux-saga/effects';
import { actions, types } from '../actions/fund';
import { types as ethereumTypes } from '../actions/ethereum';
import { actions as appActions, types as appTypes } from '../actions/app';
import { types as routeTypes } from '../actions/routes';
import {
  types as orderbookTypes,
  actions as orderbookActions,
} from '../actions/orderbook';
import { actions as holdingsActions } from '../actions/holdings';
import { actions as recentTradesActions } from '../actions/recentTrades';
import { actions as tradeHistoryActions } from '../actions/tradeHistory';
import {
  actions as openOrdersActions,
  types as openOrdersTypes,
} from '../actions/openOrders';
import { types as tradeTypes } from '../actions/trade';

import {
  actions as rankingActions,
  types as rankingTypes,
} from '../actions/ranking';

import { types as participationTypes } from '../actions/participation';

function* requestInfo({ address }) {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  try {
    const account = yield select(state => state.ethereum.account);
    const environment = getEnvironment();
    const fundInfo = yield call(getFundInformations, environment, {
      fundAddress: address,
    });
    yield put(actions.progressiveUpdate({ ...fundInfo, address }));
    const calculations = yield call(performCalculations, environment, {
      fundAddress: address,
    });
    yield put(actions.progressiveUpdate(calculations));

    const config = yield call(getConfig);
    yield put(actions.progressiveUpdate({ config }));

    const participationAuthorizations = yield call(
      isInvestAllowed,
      environment,
      { fundAddress: address, investAssetSymbol: config.quoteAssetSymbol },
    );

    const parosEndTime = yield call(getEndTime, environment);
    const isParosActive = yield call(isCompetitionActive, environment);

    const info = {
      ...participationAuthorizations,
      ...fundInfo,
      ...calculations,
      address,
      loading: false,
      parosEndTime,
      isParosActive,
    };
    if (account) {
      const participation = yield call(getParticipation, environment, {
        fundAddress: fundInfo.fundAddress,
        investorAddress: account,
      });
      info.personalStake = participation.personalStake;
    }

    const lastRequest = yield call(getLastRequest, environment, fundInfo);
    const existsRequest = lastRequest.id.toString() !== '1.157920892373162e+77';

    if (lastRequest.status === requestStatus.ACTIVE && existsRequest) {
      yield put(actions.setPendingRequest(lastRequest));
    }

    yield put(actions.infoSucceeded(info));
  } catch (err) {
    console.error(err);
    yield put(actions.infoFailed(err));
  }
}

function* checkAndLoad() {
  // HACK: We should use state.location.payload... but it seems to be broken
  const address = yield select(state => state.location.pathname.slice(1));
  let isReadyToVisit = yield select(state => state.app.isReadyToVisit);
  yield put(actions.setLoading(address));

  while (!isReadyToVisit) {
    yield take(appTypes.SET_READY_STATE);
    isReadyToVisit = yield select(state => state.app.isReadyToVisit);
  }

  yield put(actions.infoRequested(address));
}

function* getUsersFund({ account }) {
  yield put(actions.signSucceeded(undefined));
  if (!account) {
    put(appActions.setUsersFund());
  } else {
    const environment = getEnvironment();

    const fundAddress = yield call(getFundForManager, environment, {
      managerAddress: account,
    });
    // Even if fundAddress is undefined (i.e. user hasnt a fund yet), we dispatch
    // this action to signal that we tried to get the users fund
    yield put(appActions.setUsersFund(fundAddress));
  }
}

function* getRanking() {
  yield put(rankingActions.getRanking());
}

function* addRanking() {
  const ranking = yield select(state => state.ranking.rankingList);
  const fundAddress = yield select(state => state.fund.address);
  const fundRanking = ranking.find(r => r.address === fundAddress);

  if (fundRanking) {
    const numberOfFunds = ranking.length ? ranking.length : 'N/A';
    yield put(
      actions.updateRanking({
        rank: fundRanking.rank,
        numberOfFunds,
        expectedPrize: fundRanking.expectedPrize,
        isCompeting: fundRanking.isCompeting,
      }),
    );
  }
}

function* afterTradeUpdate() {
  const fundAddress = yield select(state => state.fund.address);
  yield put(actions.sharePriceRequested());
  yield put(holdingsActions.getHoldings(fundAddress));
  yield put(orderbookActions.getOrderbook());
  yield put(recentTradesActions.getRecentTrades());
  yield put(tradeHistoryActions.getTradeHistory(fundAddress));
  yield put(openOrdersActions.getOpenOrders(fundAddress));
}

function* requestSharePrice() {
  const fundAddress = yield select(state => state.fund.address);
  const environment = getEnvironment();
  const calculations = yield call(performCalculations, environment, {
    fundAddress,
  });
  yield put(
    actions.sharePriceSucceeded({ sharePrice: calculations.sharePrice }),
  );
}

function* afterParticipationUpdate() {
  const fundAddress = yield select(state => state.fund.address);
  yield put(actions.infoRequested(fundAddress));
  yield put(holdingsActions.getHoldings(fundAddress));
}

function* afterCancelOrderUpdate() {
  const fundAddress = yield select(state => state.fund.address);
  yield put(holdingsActions.getHoldings(fundAddress));
}

function* fund() {
  yield takeLatest(types.INFO_REQUESTED, requestInfo);
  yield takeLatest(types.SHARE_PRICE_REQUESTED, requestSharePrice);
  yield takeLatest(routeTypes.FUND, checkAndLoad);
  yield takeLatest(ethereumTypes.ACCOUNT_CHANGED, getUsersFund);
  yield takeLatest(orderbookTypes.GET_ORDERBOOK_SUCCEEDED, getRanking);
  yield takeLatest(rankingTypes.GET_RANKING_SUCCEEDED, addRanking);
  yield takeLatest(tradeTypes.TAKE_ORDER_SUCCEEDED, afterTradeUpdate);
  yield takeLatest(tradeTypes.PLACE_ORDER_SUCCEEDED, afterTradeUpdate);
  yield takeLatest(
    participationTypes.EXECUTE_SUCCEEDED,
    afterParticipationUpdate,
  );
  yield takeLatest(
    participationTypes.REDEEM_ALL_OWNED_ASSETS_SUCCEEDED,
    afterParticipationUpdate,
  );
  yield takeLatest(
    openOrdersTypes.CANCEL_ORDER_SUCCEEDED,
    afterCancelOrderUpdate,
  );
}

export default fund;
