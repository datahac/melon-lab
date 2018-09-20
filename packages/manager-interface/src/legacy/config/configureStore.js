import { connectRoutes } from 'redux-first-router';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createHashHistory from 'history/createHashHistory';
import createMemoryHistory from 'history/createMemoryHistory';

import { routeMap } from '../actions/routes';
import reducerMap from '../reducers';
import rootSaga from '../sagas';

export const configureStore = preloadedState => {
  const {
    reducer: location,
    middleware: routerMiddleware,
    enhancer,
    initialDispatch,
  } = connectRoutes(routeMap, {
    initialDispatch: false,
    createHistory:
      typeof window !== 'undefined' ? createHashHistory : createMemoryHistory,
  });

  const sagaMiddleware = createSagaMiddleware({
    onError: global.Raven ? global.Raven.captureException : undefined,
  });

  const middlewares = applyMiddleware(routerMiddleware, sagaMiddleware);

  // TODO: For security reasons (intercepting passwords and stuff), disable
  // redux devtools on production!
  /* eslint-disable no-underscore-dangle */
  const devTools =
    global.__REDUX_DEVTOOLS_EXTENSION__ &&
    (process.env.NODE_ENV === 'development' || ELECTRON)
      ? global.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f;
  /* eslint-enable */

  const enhanced = compose(
    enhancer,
    middlewares,
    devTools,
  );

  const store = createStore(
    combineReducers({ ...reducerMap, location }),
    preloadedState,
    enhanced,
  );

  sagaMiddleware.run(rootSaga);
  initialDispatch();

  return store;
};

export default configureStore;
