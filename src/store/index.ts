import { applyMiddleware, createStore, Middleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper, MakeStore } from 'next-redux-wrapper'

import rootReducer from './root-reducer'
import rootSaga from './root-saga'

const bindMiddleware = (middleware:Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]))

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}
let store = makeStore()
export type RootState = ReturnType<typeof store.getState>
export const wrapper = createWrapper(makeStore, { debug: true })
