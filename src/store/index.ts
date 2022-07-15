import {
  AnyAction,
  applyMiddleware,
  createStore,
  Middleware,
  Store,
  StoreEnhancer
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Context, createWrapper, HYDRATE } from 'next-redux-wrapper';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer:any = (state: RootState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const clientState = { ...state };
    const serverState = { ...action.payload };
    const nextState = { ...clientState, ...serverState };

    return nextState;
  }

  return rootReducer(state, action);
};

export const makeStore:any = (context: Context) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  // 2: Add an extra parameter for applying middleware:
  const store = createStore(reducer, bindMiddleware([sagaMiddleware]));

  // 3: Run your sagas on server
  store.sagaTask = sagaMiddleware.run(rootSaga);

  // 4: now return the store:
  return store;
};
export type RootState = ReturnType<typeof rootReducer>;

export const wrapper = createWrapper<Store<RootState>>(makeStore);
