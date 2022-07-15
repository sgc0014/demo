import _ from 'lodash';
import * as actionTypes from './app.types';

const INITIAL_STATE = {
  app: null,
  loading: false
};

const appReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;
  let updatedState;

  switch (type) {
    case actionTypes.SET_APP:
      updatedState = { ...state, app: payload, loading: false };
      return updatedState;
    case actionTypes.GET_APP_START:
      updatedState = { ...state, loading: true };
      return updatedState;
    default:
      return state;
  }
};

export default appReducer;
