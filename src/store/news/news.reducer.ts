import * as newsTypes from './news.types';

const INITIAL_STATE = {
  isFetching: false,
  results: [],
  errors: {}
};

const newsReducer = (state = INITIAL_STATE, action:any) => {
  const { type, payload } = action;
  let updatedState:any = {};
  switch (type) {
    case newsTypes.FETCH_NEWS_START:
      return {
        ...state,
        isFetching: true,
      };

    case newsTypes.FETCH_NEWS_SUCCESS:
      updatedState = {
        ...state,
      };
      updatedState.isFetching = false;
      updatedState.results = payload.data;
      return updatedState;

    case newsTypes.FETCH_NEWS_FAIL:
      return {
        ...state,
        isFetching: false,
        errors: payload.error,
      };

    default:
      return state;
  }
};

export default newsReducer;
