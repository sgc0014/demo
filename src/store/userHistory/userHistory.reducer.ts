import _ from 'lodash';

import * as UserHistoryType from './userHistory.types';

const INITIAL_STATE = {
  loading: false,
  updateLoading: false,
  follows: [],
  results: [],
  errors: {}
};

const userHistoryReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  let updatedState;
  switch (type) {
    case UserHistoryType.FETCH_FOLLOW_START:
      return {
        ...state,
        loading: true
      };

    case UserHistoryType.FETCH_FOLLOW_SUCCESS:
      updatedState = {
        ...state,
        results: {
          ...state.results
        }
      };
      updatedState.loading = false;
      updatedState.follows = _.uniq(
        [].concat(updatedState.follows, payload.list)
      ); // can be done using lodash no need to reinvent the wheel
      payload.data.forEach((meta) => {
        updatedState.results[meta.symbol] = meta;
      });
      return updatedState;

    case UserHistoryType.FETCH_FOLLOW_FAIL:
      return {
        loading: false,
        errors: payload.err
      };

    case UserHistoryType.FOLLOW_START:
      updatedState = {
        ...state,
        loading: true
      };
      updatedState.follows = _.uniq(
        [].concat(updatedState.follows, payload.value)
      );
      return updatedState;

    case UserHistoryType.FOLLOW_SUCCESS:
      updatedState = {
        ...state,
        results: {
          ...state.results
        }
      };
      updatedState.loading = false;
      updatedState.results[payload.items.symbol] = payload.items;
      return updatedState;

    case UserHistoryType.FOLLOW_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload
      };

    case UserHistoryType.UN_FOLLOW_START:
      updatedState = {
        ...state,
        loading: true
      };
      const idUFS = updatedState.follows
        .map((item) => item)
        .indexOf(payload.value);
      if (idUFS > -1) {
        updatedState.follows.splice(idUFS, 1);
      }
      return updatedState;

    case UserHistoryType.UN_FOLLOW_SUCCESS:
      return  {
        ...state,
        loading: false,
      };

    case UserHistoryType.UN_FOLLOW_FAIL:
      return {
        ...state,
        loading: false
      };

    case UserHistoryType.SET_SPAC_EMAIL_ALERT_START:
    case UserHistoryType.SET_SPAC_SMS_ALERT_START:
      return {
        ...state,
        updateLoading: true
      };

    case UserHistoryType.SET_SPAC_EMAIL_ALERT_SUCCESS:
      // console.log('payload: ', payload);
      updatedState = {
        ...state,
        updateLoading: false
      };
      updatedState.results[payload.symbol] = {
        ...updatedState.results[payload.symbol],
        ...payload
      };
      return updatedState;

    case UserHistoryType.SET_SPAC_SMS_ALERT_SUCCESS:
      // console.log('payload: ', payload);
      updatedState = {
        ...state,
        updateLoading: false
      };
      updatedState.results[payload.symbol] = {
        ...updatedState.results[payload.symbol],
        ...payload
      };
      return updatedState;

    case UserHistoryType.SET_SPAC_EMAIL_ALERT_FAIL:
    case UserHistoryType.SET_SPAC_SMS_ALERT_FAIL:
      return {
        ...state,
        updateLoading: false,
        errors: payload
      };

    default:
      return state;
  }
};

export default userHistoryReducer;
